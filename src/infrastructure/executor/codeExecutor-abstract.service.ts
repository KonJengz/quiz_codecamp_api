import { ITestCase } from './codeExecutor.service';

export enum CodeExecutionEnum {
  Success = 'SUCCESS',
  Fail = 'Fail',
}

export type CodeExecutionOptions = {
  timeout?: number;
  debug?: boolean;
  memoryLimit?: number;
  maxExecutionCount?: number;
};

export type TestedCodeResults = {
  passed: number;
  failed: TestResultType['detail'][];
  total: number;
};

export type CodeSubmitResult = {
  status: CodeExecutionEnum;
  isError: boolean;
  errMsg: string;
  logs: string[];
  results: TestedCodeResults;
};

export type CodeExecutionResult = {
  isError: boolean;
  errMsg: string;
  logs: string[];
};

export type TestResultType = {
  passed: boolean;
  detail: {
    actual: unknown;
    expected: unknown;
    testCase: number;
    error?: string;
  };
  error: string;
};

export abstract class CodeExecutorService {
  public abstract execute(code: string): Promise<CodeExecutionResult>;

  public abstract submit(
    code: string,
    testCases: ITestCase[],
    isFunction: boolean,
    options?: CodeExecutionOptions,
  ): Promise<CodeSubmitResult>;
}
