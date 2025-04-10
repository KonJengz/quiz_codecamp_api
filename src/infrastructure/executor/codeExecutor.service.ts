import { Logger } from '@nestjs/common';
import {
  CodeExecutionOptions,
  CodeExecutionResult,
  CodeExecutorService,
  SubmittedCodeResult,
  TestedCodeResults,
  ValidateCodeInput,
  ValidateCodeOutput,
} from './codeExecutor-abstract.service';
import * as ivm from 'isolated-vm';
import { ErrorApiResponse } from 'src/core/error-response';
import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';
import { SubmissionStatusEnum } from 'src/resources/submissions/domain/submission.domain';

export enum TestCaseMatcherEnum {
  toBe = 'toBe',
}

type TestResultType = {
  passed: boolean;
  detail: {
    actual: unknown;
    expected: unknown;
  };
  error: string;
};

export interface ITestCase {
  /**
   * Result from function return
   */
  result?: boolean;
  /**
   * Expect as a variable name if it's not a function case
   */
  expect?: string;
  matcher: TestCaseMatcherEnum;
  /**
   * Expected results
   */
  expected: any;
  input: any[];
}

export type ResultsFromExecuted = {
  results: TestedCodeResults;
  passed: boolean;
};

export class IVMCodeExecutor implements CodeExecutorService {
  private readonly logger: Logger = new Logger(IVMCodeExecutor.name);

  private arrowFnRegex = new RegExp(/\=\s*\(\s*\)\s*=>/);
  private functionRegex = new RegExp(/function\s+(\w+\s*)?\(/);

  private ivmConfig = {
    memoryLimit: 8,
    maxExecutionCount: 1000,
    timeout: 5000,
  };

  private generateConsole(): string {
    const func = `const console = {
    _logs: [],
    log: function(...args) {
      // Store logs in an array inside the sandbox
      this._logs.push(args.map(arg => 
        typeof arg === 'object' && arg !== null ? JSON.stringify(arg) : String(arg)
      ).join(' '));
    },
  };`;

    return func;
  }

  private async sandbox(options: CodeExecutionOptions = {}): Promise<{
    context: ivm.Context;
    isolate: ivm.Isolate;
  }> {
    const { debug, timeout, maxExecutionCount, memoryLimit } = options;
    const config = {
      memoryLimit: memoryLimit || this.ivmConfig.memoryLimit,
      maxExecutionCount: maxExecutionCount || this.ivmConfig.maxExecutionCount,
      timeout: timeout || this.ivmConfig.timeout,
      debug: debug || false,
    };

    const isolate = new ivm.Isolate({ memoryLimit: config.memoryLimit });
    try {
      const context = await isolate.createContext();
      const jail = context.global;

      await jail.set('console', {}, { copy: true });
      const generateConsoleFunc = this.generateConsole();
      // Setting up console for context.
      await context.eval(generateConsoleFunc);
      return { context, isolate };
    } catch (err) {
      this.logger.error(err?.message);
    }
  }

  private async getAllLogFromContext(context: ivm.Context): Promise<string> {
    return context.eval(`JSON.stringify(console._logs)`);
  }

  public async execute(code: string): Promise<CodeExecutionResult> {
    let isolate: ivm.Isolate;
    try {
      const sandbox = await this.sandbox();
      const { context } = sandbox;
      isolate = sandbox.isolate;
      await context.eval(code);

      const logs = await this.getAllLogFromContext(context);

      return {
        isError: false,
        errMsg: null,
        logs: JSON.parse(logs),
      };
    } catch (err) {
      this.logger.error(err?.message);
      return {
        isError: true,
        errMsg: err?.stack,
        logs: [],
      };
    } finally {
      if (isolate) isolate.dispose();
    }
  }

  public async submit(
    code: string,
    testCases: ITestCase[],
    questionDetails: { isFunction: boolean; variableName: string },
    options?: CodeExecutionOptions,
  ): Promise<SubmittedCodeResult> {
    let isolate: ivm.Isolate;
    let results: TestedCodeResults;
    let status: SubmissionStatusEnum;
    const { isFunction, variableName } = questionDetails;
    try {
      const { context } = await this.sandbox(options);

      if (isFunction) {
        const { passed, results: testResult } =
          await this.executeFnCodeWithTest({
            code,
            context,
            testCases,
            fnName: variableName,
          });
        results = testResult;
        status = passed
          ? SubmissionStatusEnum.PASSED
          : SubmissionStatusEnum.FAILED;
      } else {
        const { passed, results: testResult } =
          await this.executeNonFnCodeWithTest({
            code,
            context,
            testCases,
          });
        results = testResult;
        status = passed
          ? SubmissionStatusEnum.PASSED
          : SubmissionStatusEnum.FAILED;
      }

      if (!results)
        throw ErrorApiResponse.internalServerError(
          'There is an Error on the server while running test.',
        );

      const logs = await this.getAllLogFromContext(context);
      return {
        errMsg: null,
        isError: false,
        logs: JSON.parse(logs),
        status,
        results,
      };
    } catch (err) {
      this.logger.error(err?.message);
      return {
        errMsg: err?.stack,
        isError: true,
        logs: [],
        status,
        results: { passed: [], failed: [], total: testCases.length },
      };
    } finally {
      if (isolate) isolate.dispose();
    }
  }

  private resolveTestResult(
    testResults: TestResultType,
    numOrder: number,
  ): TestedCodeResults['failed'][number] {
    return {
      actual: testResults.detail.actual,
      expected: testResults.detail.expected,
      testCase: numOrder,
    };
  }

  private async executeFnCodeWithTest({
    code,
    context,
    testCases,
    fnName,
  }: {
    code: string;
    context: ivm.Context;
    testCases: ITestCase[];
    fnName: string;
  }): Promise<ResultsFromExecuted> {
    const results: TestedCodeResults = {
      failed: [],
      passed: [],
      total: testCases.length,
    };

    let passed: ResultsFromExecuted['passed'] = true;

    if (testCases.length > 0) {
      for (const [index, testCase] of testCases.entries()) {
        const numOrder = index + 1;
        try {
          if (!(testCase.input && testCase.expected))
            throw ErrorApiResponse.internalServerError(
              `The test case does not provide input or output. Please try again.`,
            );

          // const inputs = this.parseInputToOriginalValue(testCase.input).join(
          //   ', ',
          // );
          const invokedCode = `${code} \n ${fnName}(${testCase.input.join(',')})`;
          const result = await context.eval(invokedCode);
          const assertionCode = this.generateAssertionCode(testCase, result);
          const testResult = await context.eval(assertionCode, {
            timeout: this.ivmConfig.timeout,
          });
          const parsedTestResult: TestResultType = JSON.parse(testResult);
          const testResultDetail = this.resolveTestResult(
            parsedTestResult,
            numOrder,
          );
          if (!parsedTestResult.passed) {
            results.failed.push(testResultDetail);
            passed = false;
            continue;
          }
          results.passed.push(testResultDetail);
        } catch (err) {
          this.logger.error(err?.stack);
          results.failed.push({
            actual: '',
            expected: '',
            testCase: numOrder,
            error: `There is an error while testing code: ${err?.message}`,
          });
          passed = false;
        }
      }
    }

    return { results, passed };
  }

  private async executeNonFnCodeWithTest({
    code,
    context,
    testCases = [],
  }: {
    code: string;
    context: ivm.Context;
    testCases: ITestCase[];
  }): Promise<ResultsFromExecuted> {
    const results: TestedCodeResults = {
      failed: [],
      passed: [],
      total: testCases.length,
    };

    let passed: ResultsFromExecuted['passed'] = true;
    console.log('Code', code);
    const response = await context.eval(code, {
      timeout: this.ivmConfig.timeout,
    });
    console.log('Response', response);
    if (testCases.length > 0) {
      for (const [index, testCase] of testCases.entries()) {
        const numOrder = index + 1;
        try {
          const assertionCode = this.generateAssertionCode(testCase);
          const testResult: TestResultType = await context.eval(assertionCode, {
            timeout: this.ivmConfig.timeout,
          });

          const testResultDetail = this.resolveTestResult(testResult, numOrder);
          if (!testResult.passed) {
            results.failed.push(testResultDetail);
            passed = false;
            continue;
          }
          results.passed.push(testResultDetail);
        } catch (err) {
          this.logger.error(err?.message);
          passed = false;
          results.failed.push({
            actual: '',
            expected: '',
            testCase: numOrder,
            error: 'There is an error while testing code.',
          });
        }
      }
    }

    return { results, passed };
  }

  private assertionFramework: string = `
  function expect(actual) {
    return {
      ${TestCaseMatcherEnum.toBe}: (expected) => {
        const passed = actual === expected;
        const result = {
          passed, 
          detail : {
            actual,
            expected
          },
          error: ""
        }
        if (!passed) {
         result.error = \`Expected \${JSON.stringify(actual)} to be \${JSON.stringify(expected)}\` 
        }
        return result;
      },
    };
  }
  `;

  private generateAssertionCode(testCase: ITestCase, result?: unknown): string {
    const assertionFrameWork = this.assertionFramework;

    let expectToTest: unknown;
    if (result) {
      expectToTest = result;
    } else if (testCase.expect) {
      expectToTest = testCase.expect;
    } else {
      throw new Error('Wrong detail of test case provided.');
    }

    if (!expectToTest)
      throw ErrorApiResponse.internalServerError(
        `No input for test. Please try again.`,
      );

    let assertionCode = `expect(${expectToTest}).${testCase.matcher}(${testCase.expected})`;

    return `
    (() => {
    ${assertionFrameWork}
    
    const __result__ = ${assertionCode};
    
   return JSON.stringify(__result__)
    })()
  `;
  }

  public generateTestCase(
    testCases: CreateQuestionDto['testCases'],
  ): ITestCase[] {
    return testCases.map(({ input, output }) => ({
      expected: output,
      matcher: TestCaseMatcherEnum.toBe,
      input: input,
    }));
  }

  public validateCode(input: ValidateCodeInput): ValidateCodeOutput {
    const { codes, detail } = input;
    const { isFunction, variableName } = detail;

    if (!codes.every((code) => code.includes(variableName)))
      return {
        isValid: false,
        errMsg: `The provided code for checking does not have variable name: ${variableName}`,
      };

    if (isFunction) {
      const isFn = codes.every((code) => this.validateFunctionSyntax(code));
      if (!isFn)
        return {
          errMsg:
            'Provided type of code as a function but the function itself does not have any function syntax. Please try again',
          isValid: false,
        };
    }
    return { errMsg: null, isValid: true };
  }

  public validateFunctionSyntax(code: string): boolean {
    return this.arrowFnRegex.test(code) || this.functionRegex.test(code);
  }

  // public parseInputToOriginalValue(
  //   inputGenerator: ITestCase['input'],
  // ): unknown[] {
  //   const generateInputs = new Function(`return ${inputGenerator}`)();
  //   return generateInputs();
  // }

  // public changeToGeneratorFunc(input: any[]) {
  //   return `() => ${input}`;
  // }
}
