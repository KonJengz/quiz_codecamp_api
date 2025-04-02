import { Logger } from '@nestjs/common';
import {
  CodeExecutionEnum,
  CodeExecutionOptions,
  CodeExecutionResult,
  CodeExecutorService,
} from './codeExecutor-abstract.service';
import * as ivm from 'isolated-vm';
import { ErrorApiResponse } from 'src/core/error-response';

export enum TestCaseMatcherEnum {
  toBe = 'toBe',
}

export interface ITestCase {
  result?: boolean;
  expect?: string;
  matcher: TestCaseMatcherEnum;
  expected: string;
  input?: unknown[];
}

export class IVMCodeExecutor implements CodeExecutorService {
  private readonly logger: Logger = new Logger(IVMCodeExecutor.name);

  private ivmConfig = {
    memoryLimit: 128,
    maxExecutionCount: 1000,
    timeout: 5000,
  };

  private generateConsole({
    debug,
    logs,
  }: {
    debug: boolean;
    logs: string[];
  }): string {
    const func = `const console = {
    _logs: [],
    log: function(...args) {
      // Store logs in an array inside the sandbox
      this._logs.push(args.map(arg => 
        typeof arg === 'object' && arg !== null ? JSON.stringify(arg) : String(arg)
      ).join(' '));
    },
    // Add other console methods as needed
  };`;

    return func;
  }

  public async execute(
    code: string,
    isFunction: boolean,
    testCases: ITestCase[] = [],
    options: CodeExecutionOptions = {},
  ): Promise<CodeExecutionResult> {
    const { debug, timeout, maxExecutionCount, memoryLimit } = options;
    const config = {
      memoryLimit: memoryLimit || this.ivmConfig.memoryLimit,
      maxExecutionCount: maxExecutionCount || this.ivmConfig.maxExecutionCount,
      timeout: timeout || this.ivmConfig.timeout,
      debug: debug || false,
    };

    // Array to collect all logs
    const allLogs: string[] = [];

    const isolate = new ivm.Isolate({ memoryLimit: config.memoryLimit });
    try {
      const context = await isolate.createContext();
      const jail = context.global;

      // await jail.set('console', {}, { copy: true });
      const func = this.generateConsole({
        debug: config.debug,
        logs: allLogs,
      });
      await context.eval(func);
      let results;

      if (isFunction) {
        results = await this.executeFnCode({ code, context, testCases });
      } else {
        results = await this.executeNonFnCode({
          code,
          context,
          testCases,
        });
      }

      const logs = await context.eval(`JSON.stringify(console._logs)`);

      return {
        error: null,
        logs: JSON.parse(logs),
        status: CodeExecutionEnum.Success,
        testResults: results,
      };
    } catch (err) {
      this.logger.error(err?.message);
      return {
        error: `There is an system error while setting vm : ${err?.message}`,
        logs: allLogs,
        status: CodeExecutionEnum.Fail,
      };
    } finally {
      if (isolate) {
        isolate.dispose();
      }
    }
  }

  private async executeFnCode({
    code,
    context,
    testCases,
  }: {
    code: string;
    context: ivm.Context;
    testCases: ITestCase[];
  }) {
    const testResults = [];

    if (testCases.length > 0) {
      for (const [index, testCase] of testCases.entries()) {
        try {
          if (!(testCase.input && testCase.expected))
            throw ErrorApiResponse.internalServerError(
              `The test case does not provide input or output. Please try again.`,
            );
          const userFn = new Function('input', code);

          const result = context.eval(userFn(...testCase.input));
          const assertionCode = this.generateAssertionCode(testCase, result);
          const testResult = context.eval(assertionCode, {
            timeout: this.ivmConfig.timeout,
          });
          testResults.push({ ...testResult, testCase: index + 1 });
        } catch (err) {
          testResults.push({
            passed: false,
            error: `Assertion error: ${err.toString()}`,
            testCase: index + 1,
          });
        }
      }
    }

    return testResults;
  }

  private async executeNonFnCode({
    code,
    context,
    testCases = [],
  }: {
    code: string;
    context: ivm.Context;
    testCases: ITestCase[];
  }) {
    const testResults = [];
    console.log('Code in execute code.', code);
    await context.eval(code, {
      timeout: this.ivmConfig.timeout,
    });
    if (testCases.length > 0) {
      for (const [index, testCase] of testCases.entries()) {
        try {
          const assertionCode = this.generateAssertionCode(testCase);
          const result = await context.eval(assertionCode, {
            timeout: this.ivmConfig.timeout,
          });

          testResults.push({ ...result, testCase: index + 1 });
        } catch (err) {
          testResults.push({
            passed: false,
            error: `Assertion error: ${err.toString()}`,
            testCase: index + 1,
          });
        }
      }
    }

    return testResults;
  }

  private assertionFramework: string = `
  const __testResults = { passed: false, details: {} };

  function expect(actual) {
    return {
      ${TestCaseMatcherEnum.toBe}: (expected) => {
        const passed = actual === expected;
        __testResults.passed = true;
        __testResults.details = {
          actual,
          expected,
        };
        if (!passed) {
          __testResults.error = \`Expected \${JSON.stringify(actual)} to be \${JSON.stringify(expected)}\`;
        }
        return passed;
      },
    };
  }
  `;

  private generateAssertionCode(testCase: ITestCase, result?: unknown) {
    const assertionFrameWork = this.assertionFramework;

    let expectToTest: unknown;
    if (testCase.result) {
      if (!result)
        throw new Error(`Need result for test case but not provided.`);

      expectToTest = result;
    } else if (testCase.expect) {
      expectToTest = testCase.expect;
    } else {
      throw new Error('Wrong detail of test case provided.');
    }

    let assertionCode = `expect(${expectToTest}).${testCase.matcher}(${testCase.expected})`;

    return `
    ${assertionFrameWork}
    
    try {
      ${assertionCode};
    } catch (e) {
      __testResults.passed = false;
      __testResults.error = e.toString();
    }
    
    JSON.stringify(__testResults);
  `;
  }
}
