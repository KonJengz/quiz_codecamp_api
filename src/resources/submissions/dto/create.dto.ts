import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CoreApiResponse } from 'src/core/api-response';
import { Question } from 'src/resources/questions/domain/question.domain';
import { Submission } from '../domain/submission.domain';
import { User } from 'src/resources/users/domain/user.domain';

export class CreateSubmissionDto {
  @ApiProperty({ type: String, description: 'Question ID.' })
  @IsString()
  questionId: Question['id'];

  @ApiProperty({ type: String, description: 'User input code for submit' })
  @IsString()
  code: string;
}

export class CreateSubmissionResponse extends CoreApiResponse<Submission> {
  @ApiProperty({ type: Submission })
  public data: Submission;
}

export type CreateSubmissionInput = CreateSubmissionDto & {
  userId: User['id'];
};
