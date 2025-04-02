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

export type CodeExecutionResult = {
  status: CodeExecutionEnum;
  error: string;
  logs: string[];
  testResults?: any[];
};

export abstract class CodeExecutorService {
  public abstract execute(
    code: string,
    isFunction: boolean,
    testCases?: ITestCase[],
    options?: CodeExecutionOptions,
  ): Promise<CodeExecutionResult>;
}
