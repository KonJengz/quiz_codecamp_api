import { Model } from 'mongoose';
import { Submission, SubmissionStatusEnum } from '../domain/submission.domain';
import { SubmissionSchemaClass } from './entities/submissions.entity';
import { SubmissionRepository } from './submissions-abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { SubmissionMapper } from './mapper/submission.mapper';

export class SubmissionDocumentRepository implements SubmissionRepository {
  private mockSubmission = new Submission({
    id: '',
    code: '',
    createdAt: '',
    questionId: '',
    status: SubmissionStatusEnum.FAILED,
    updatedAt: '',
    userId: '',
  });
  private mockPromiseSub = Promise.resolve(this.mockSubmission);
  constructor(
    @InjectModel(SubmissionSchemaClass.name)
    private readonly submissionModel: Model<SubmissionSchemaClass>,
  ) {}

  // async create(data: Omit<Submission, 'id'>): Promise<Submission> {
  //   const { createdAt, updatedAt, deletedAt, ...rest } = data;
  // }

  async create(
    data: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Submission> {
    const createdSubmission = new this.submissionModel(data);
    await createdSubmission.save();
    return SubmissionMapper.toDomain(createdSubmission);
  }

  public async upsert(
    data: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Submission> {
    const upsertedSubmission = await this.submissionModel.findOneAndUpdate(
      {
        userId: data.userId,
        questionId: data.questionId,
      },
      data,
      { new: true, upsert: true },
    );

    return SubmissionMapper.toDomain(upsertedSubmission);
  }

  findById(id: string): Promise<Submission> {
    return this.mockPromiseSub;
  }
  findMany(): Promise<Submission[]> {
    return Promise.resolve([this.mockSubmission]);
  }
  update<U extends Partial<Omit<Submission, 'id'>>>(
    data: U,
    id: string,
  ): Promise<Submission> {
    return this.mockPromiseSub;
  }
}
