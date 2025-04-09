import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Submission } from './domain/submission.domain';
import { CreateSubmissionInput } from './dto/create.dto';
import {
  CodeExecutorService,
  SubmittedCodeResult,
} from 'src/infrastructure/executor/codeExecutor-abstract.service';
import {
  ITestCase,
  TestCaseMatcherEnum,
} from 'src/infrastructure/executor/codeExecutor.service';
import { QuestionsService } from '../questions/questions.service';
import { ErrorApiResponse } from 'src/core/error-response';

@Injectable()
export class SubmissionsService extends Service<Submission> {
  private mockSubmission: Submission = new Submission({
    id: '',
    code: '',
    createdAt: '',
    questionId: '',
    updatedAt: '',
    userId: '',
  });

  constructor(
    private readonly codeExecutorService: CodeExecutorService,
    private readonly questionsService: QuestionsService,
  ) {
    super();
  }

  private executeCode() {}

  override async create(data: CreateSubmissionInput): Promise<Submission> {
    const isQuestionsExist = await this.questionsService.getById(
      data.questionId,
    );

    if (!isQuestionsExist)
      throw ErrorApiResponse.notFound('ID', data.questionId, 'Question');

    if (!isQuestionsExist.testCases || isQuestionsExist.testCases.length === 0)
      throw ErrorApiResponse.conflictRequest(
        `The question ID: ${isQuestionsExist} does not have any test case. Please contact developer to adding test case before submitting.`,
      );

      this.questionsService
    const resultObj = await this.runUserCodeWithTest(data.code);

    console.log(resultObj);

    return Promise.resolve(this.mockSubmission);
  }

  private async runUserCodeWithTest(
    userCode: CreateSubmissionInput['code'],
  ): Promise<SubmittedCodeResult> {
    // const result = await this.codeExecutorService.submit(userCode, testCases, {
    //   isFunction: true,
    //   variableName: 'hehe',
    // });
    // return result;
    return null;
  }

  getById(id: string): Promise<Submission> {
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
}
