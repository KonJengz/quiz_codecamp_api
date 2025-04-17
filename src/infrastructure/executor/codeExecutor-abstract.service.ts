import { Type } from '@nestjs/common';
import { NullAble } from 'src/common/types/types';
import { ITestCase } from './codeExecutor.service';
import { TestCase } from 'src/resources/test-cases/domain/test-cases.domain';
import { SubmissionStatusEnum } from 'src/resources/submissions/domain/submission.domain';
import { ApiProperty } from '@nestjs/swagger';

export type CodeExecutionOptions = {
  timeout?: number;
  debug?: boolean;
  memoryLimit?: number;
  maxExecutionCount?: number;
};

export type TestedCodeResults = {
  passed: TestResultType['detail'][];
  failed: TestResultType['detail'][];
  total: number;
};

export type SubmittedCodeResult = {
  status: SubmissionStatusEnum;
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

export class TestResultDetail {
  @ApiProperty({ examples: [[1, 5], 'string', { name: 'John' }] })
  actual: any;
  @ApiProperty({ examples: ['Hello world', 1, { age: 18 }] })
  expected: any;
  @ApiProperty({ type: Number })
  testCase: number;
  error?: string;
}

export type TestResultType = {
  passed: boolean;
  detail: TestResultDetail;
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
    testCases: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>[],
    variableName: string,
  ): ITestCase[];

  public abstract validateCode(input: ValidateCodeInput): ValidateCodeOutput;

  public abstract validateFunctionSyntax(code: string): boolean;

  // public abstract parseInputToOriginalValue(
  //   input: ITestCase['input'],
  // ): unknown[];

  // public abstract changeToGeneratorFunc(input: any[]): string;
}
