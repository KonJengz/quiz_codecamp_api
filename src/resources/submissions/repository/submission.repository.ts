import mongoose, { Model } from 'mongoose';
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
    // We make pipeline for updating the data first,
    // If there are already a submission but status === PASSED
    // We don't update the status and code

    const codePipeline =
      data.status === SubmissionStatusEnum.PASSED
        ? {
            code: data.code,
          }
        : {
            code: {
              $cond: [
                { $eq: ['$status', SubmissionStatusEnum.PASSED] },
                '$code',
                data.code,
              ],
            },
          };

    const upsertPipeline = [
      {
        $set: {
          codePipeline,
          status: {
            $cond: [
              { $eq: ['$status', SubmissionStatusEnum.PASSED] },
              '$status',
              data.status,
            ],
          },
        },
      },
    ];

    const upsertedSubmission = await this.submissionModel.findOneAndUpdate(
      {
        userId: data.userId,
        questionId: data.questionId,
      },
      // Passing update pipeline for
      // control update flow.
      upsertPipeline,
      { new: true, upsert: true },
    );

    const returnSubmission = upsertedSubmission.$clone();

    if (
      upsertedSubmission.status === SubmissionStatusEnum.PASSED &&
      upsertedSubmission.code !== data.code
    ) {
      returnSubmission.code = data.code;

      if (data.status !== upsertedSubmission.status)
        returnSubmission.status = data.status;
    }

    return SubmissionMapper.toDomain(returnSubmission);
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
