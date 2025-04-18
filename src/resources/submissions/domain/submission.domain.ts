import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { Question } from 'src/resources/questions/domain/question.domain';
import { User } from 'src/resources/users/domain/user.domain';

export enum SubmissionStatusEnum {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export class Submission extends BaseDomain {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  userId: User['id'];

  @ApiProperty({ type: String })
  questionId: Question['id'];

  @ApiProperty({ type: String })
  code: string;

  @ApiProperty({ type: String, enum: SubmissionStatusEnum })
  status: SubmissionStatusEnum;

  constructor({
    id,
    code,
    createdAt,
    questionId,
    updatedAt,
    userId,
    status,
    deletedAt,
  }: Submission) {
    super({ id, createdAt, updatedAt, deletedAt });
    this.code = code;
    this.questionId = questionId;
    this.userId = userId;
    this.status = status;
  }
}
