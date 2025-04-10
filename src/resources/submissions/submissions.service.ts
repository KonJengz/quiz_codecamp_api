import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Submission, SubmissionStatusEnum } from './domain/submission.domain';
import { AllTestsResult, CreateSubmissionInput } from './dto/create.dto';
import {
  CodeExecutorService,
  SubmittedCodeResult,
  TestVarialbeQuestionDetail,
} from 'src/infrastructure/executor/codeExecutor-abstract.service';
import { QuestionsService } from '../questions/questions.service';
import { ErrorApiResponse } from 'src/core/error-response';
import { Question } from '../questions/domain/question.domain';
import { TestCase } from '../test-cases/domain/test-cases.domain';
import { SubmissionRepository } from './repository/submissions-abstract.repository';

@Injectable()
export class SubmissionsService extends Service<Submission> {
  private mockSubmission: Submission = new Submission({
    id: '',
    code: '',
    createdAt: '',
    questionId: '',
    updatedAt: '',
    userId: '',
    status: SubmissionStatusEnum.PASSED,
  });

  constructor(
    private readonly codeExecutorService: CodeExecutorService,
    private readonly questionsService: QuestionsService,
    private readonly submissionRepository: SubmissionRepository,
  ) {
    super();
  }

  private executeCode() {}

  override async create(
    data: CreateSubmissionInput,
  ): Promise<Submission & { testResults: AllTestsResult }> {
    const isQuestionsExist = await this.questionsService.getById(
      data.questionId,
    );

    if (!isQuestionsExist)
      throw ErrorApiResponse.notFound('ID', data.questionId, 'Question');

    if (!isQuestionsExist.testCases || isQuestionsExist.testCases.length === 0)
      throw ErrorApiResponse.conflictRequest(
        `The question ID: ${isQuestionsExist} does not have any test case. Please contact developer to adding test case before submitting.`,
      );

    const isFunction = this.validateUserSubmissionCode(
      data.code,
      isQuestionsExist,
    );

    const resultObj = await this.runUserCodeWithTest(
      data.code,
      isQuestionsExist.testCases,
      { isFunction, variableName: isQuestionsExist.variableName },
    );

    const testResults = this.resolveTestResults(resultObj);

    const createdSubmission = await this.submissionRepository.upsert({
      code: data.code,
      questionId: data.questionId,
      userId: data.userId,
      status: testResults.status,
    });

    return {
      ...createdSubmission,
      testResults,
    };
  }

  getById(id: Question['id']): Promise<Submission> {
    return Promise.resolve(this.mockSubmission);
  }

  getMany(): Promise<Submission[]> {
    return Promise.resolve([this.mockSubmission]);
  }
  update(
    data: Partial<Omit<Submission, 'id'>>,
    id: string,
  ): Promise<Submission> {
    return Promise.resolve(this.mockSubmission);
  }

  private async runUserCodeWithTest(
    userCode: CreateSubmissionInput['code'],
    testCases: TestCase[],
    questionDetail: TestVarialbeQuestionDetail,
  ): Promise<SubmittedCodeResult> {
    const { isFunction, variableName } = questionDetail;

    const genTestCases = this.codeExecutorService.generateTestCase(testCases);

    return this.codeExecutorService.submit(userCode, genTestCases, {
      isFunction,
      variableName,
    });
  }

  /**
   *
   * The function to validate the code submit
   * to the specific question
   * @param {CreateSubmissionInput}  code
   * @param {Question} question
   * @returns the boolean value to indicate wheter the question is the function type or non-function type
   */
  private validateUserSubmissionCode(
    code: CreateSubmissionInput['code'],
    question: Question,
  ): boolean {
    // Checking if the user code include function in it?
    const isFunction = this.codeExecutorService.validateFunctionSyntax(code);

    // Does starter code include function?
    const isQuestionFunc = this.codeExecutorService.validateFunctionSyntax(
      question.starterCode,
    );

    if (isFunction !== isQuestionFunc) {
      let codeType = !isQuestionFunc ? 'non-function' : 'function';
      throw ErrorApiResponse.badRequest(
        `The question require ${codeType} code but provide a code as a ${codeType}`,
      );
    }

    const { errMsg, isValid } = this.codeExecutorService.validateCode({
      codes: [code],
      detail: { isFunction, variableName: question.variableName },
    });

    if (!isValid) throw ErrorApiResponse.badRequest(errMsg);

    return isQuestionFunc;
  }

  private resolveTestResults(results: SubmittedCodeResult): AllTestsResult {
    const { errMsg, isError, results: testResults, status } = results;
    if (isError) throw ErrorApiResponse.badRequest(errMsg);
    const testResultDetail: AllTestsResult = {
      failed: 0,
      passed: 0,
      status: SubmissionStatusEnum.PASSED,
      details: [],
    };

    const numFailedCases: number = testResults.failed.length;

    if (
      status === SubmissionStatusEnum.PASSED ||
      testResults.passed.length !== testResults.total
    ) {
      if (numFailedCases > 0)
        throw ErrorApiResponse.internalServerError(
          `There is an logical-error while testing code: The test result status is ${status} but there are ${numFailedCases} test cases.`,
        );

      testResultDetail.status = status;
      testResultDetail.passed = testResults.passed.length;
      testResultDetail.details =
        testResults.passed.length >= 3
          ? testResults.passed.slice(0, 3)
          : testResults.passed;
    } else {
      testResultDetail.status = status;
      testResultDetail.failed = numFailedCases;
      testResultDetail.details = testResults.failed;
    }

    return testResultDetail;
  }
}
