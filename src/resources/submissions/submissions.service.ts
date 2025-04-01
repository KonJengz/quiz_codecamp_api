import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Submission } from './domain/submission.domain';
import { CreateSubmissionInput } from './dto/create.dto';
import { CodeExecutorService } from 'src/infrastructure/executor/codeExecutor-abstract.service';

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

  override create(data: CreateSubmissionInput): Promise<Submission> {
    return Promise.resolve(this.mockSubmission);
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
