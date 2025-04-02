import { Logger } from '@nestjs/common';
import {
  CodeExecutionEnum,
  CodeExecutionOptions,
  CodeExecutionResult,
  CodeExecutorService,
  CodeSubmitResult,
  TestedCodeResults,
} from './codeExecutor-abstract.service';
import * as ivm from 'isolated-vm';
import { ErrorApiResponse } from 'src/core/error-response';

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
  result?: boolean;
  expect?: string;
  matcher: TestCaseMatcherEnum;
  expected: unknown;
  input?: unknown[];
}

export type ResultsFromExecuted = {
  results: TestedCodeResults;
  passed: boolean;
};

export class IVMCodeExecutor implements CodeExecutorService {
  private readonly logger: Logger = new Logger(IVMCodeExecutor.name);

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
    isFunction: boolean,
    options?: CodeExecutionOptions,
  ): Promise<CodeSubmitResult> {
    let isolate: ivm.Isolate;
    let results: TestedCodeResults;
    let status: CodeExecutionEnum;
    try {
      const { context } = await this.sandbox(options);

      if (isFunction) {
        const { passed, results: testResult } =
          await this.executeFnCodeWithTest({
            code,
            context,
            testCases,
            fnName: 'calculator',
          });
        results = testResult;
        status = passed ? CodeExecutionEnum.Success : CodeExecutionEnum.Fail;
      } else {
        const { passed, results: testResult } =
          await this.executeNonFnCodeWithTest({
            code,
            context,
            testCases,
          });
        results = testResult;
        status = passed ? CodeExecutionEnum.Success : CodeExecutionEnum.Fail;
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
        results: { passed: 0, failed: [], total: testCases.length },
      };
    } finally {
      if (isolate) isolate.dispose();
    }
  }

  private resolveTestResult(
    testResults: TestResultType,
    numOrder: number,
  ): TestedCodeResults['failed'][number] {
    if (testResults.passed)
      throw ErrorApiResponse.internalServerError(
        'There is an internal server error while resolving test case.',
      );

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
      passed: 0,
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
          const invokedCode = `${code} \n ${fnName}(${testCase.input})`;
          const result = await context.eval(invokedCode);
          const assertionCode = this.generateAssertionCode(testCase, result);
          const testResult = await context.eval(assertionCode, {
            timeout: this.ivmConfig.timeout,
          });
          const parsedTestResult: TestResultType = JSON.parse(testResult);
          if (!parsedTestResult.passed) {
            results.failed.push(
              this.resolveTestResult(parsedTestResult, numOrder),
            );
            passed = false;
            continue;
          }
          ++results.passed;
        } catch (err) {
          results.failed.push({
            actual: '',
            expected: '',
            testCase: numOrder,
            error: 'There is an error while testing code.',
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
      passed: 0,
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

          if (!testResult.passed) {
            results.failed.push(this.resolveTestResult(testResult, numOrder));
            passed = false;
            continue;
          }

          ++results.passed;
        } catch (err) {
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
}
