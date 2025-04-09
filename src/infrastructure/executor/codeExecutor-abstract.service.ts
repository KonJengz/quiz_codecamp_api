import { NullAble } from 'src/common/types/types';
import { ITestCase } from './codeExecutor.service';
import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';

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

export type SubmittedCodeResult = {
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

export type TestVarialbeQuestionDetail = {
  isFunction: boolean;
  variableName: string;
};

export type ValidateCodeInput = {
  codes: string[];
  detail: TestVarialbeQuestionDetail;
};

export type ValidateCodeOutput = {
  isValid: boolean;
  errMsg: NullAble<string>;
};

export abstract class CodeExecutorService {
  public abstract execute(code: string): Promise<CodeExecutionResult>;

  public abstract submit(
    code: string,
    testCases: ITestCase[],
    questionDetails: TestVarialbeQuestionDetail,
    options?: CodeExecutionOptions,
  ): Promise<SubmittedCodeResult>;

  public abstract generateTestCase(
    testCases: CreateQuestionDto['testCases'],
  ): ITestCase[];

  public abstract validateCode(input: ValidateCodeInput): ValidateCodeOutput;

  // public abstract parseInputToOriginalValue(
  //   input: ITestCase['input'],
  // ): unknown[];

  // public abstract changeToGeneratorFunc(input: any[]): string;
}
