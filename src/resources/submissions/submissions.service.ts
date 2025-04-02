import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Submission } from './domain/submission.domain';
import { CreateSubmissionInput } from './dto/create.dto';
import { CodeExecutorService } from 'src/infrastructure/executor/codeExecutor-abstract.service';
import {
  ITestCase,
  TestCaseMatcherEnum,
} from 'src/infrastructure/executor/codeExecutor.service';

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

  constructor(private readonly codeExecutorService: CodeExecutorService) {
    super();
  }

  private executeCode() {}

  override async create(data: CreateSubmissionInput): Promise<Submission> {
    const resultObj = await this.testCode(data);
    return Promise.resolve(this.mockSubmission);
  }

  private async testCode(data: CreateSubmissionInput) {
    const testCases: ITestCase[] = [
      {
        matcher: TestCaseMatcherEnum.toBe,
        expected: 6,
        input: [2, 4],
      },
      {
        matcher: TestCaseMatcherEnum.toBe,
        expected: 154,
        input: [100, 54],
      },
      {
        matcher: TestCaseMatcherEnum.toBe,
        expected: 15,
        input: [7, 8],
      },
    ];
    const result = await this.codeExecutorService.submit(
      data.code,
      testCases,
      true,
    );
    console.log(result);
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
