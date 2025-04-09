import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CoreApiResponse } from 'src/core/api-response';
import { Question } from 'src/resources/questions/domain/question.domain';
import { Submission, SubmissionStatusEnum } from '../domain/submission.domain';
import { User } from 'src/resources/users/domain/user.domain';
import { TestResultDetail } from 'src/infrastructure/executor/codeExecutor-abstract.service';

export class AllTestsResult {
  @ApiProperty({ type: Number, description: 'The number of passed test case.' })
  passed: number;
  @ApiProperty({ type: Number, description: 'The number of failed test case.' })
  failed: number;
  @ApiProperty({
    type: String,
    description: 'The status of user submission',
    enum: SubmissionStatusEnum,
  })
  status: SubmissionStatusEnum;
  @ApiProperty({
    type: [TestResultDetail],
    description: `The details of user submission's code with test cases.`,
  })
  details: TestResultDetail[];
}

export class CreatedSubmissionAndTestResult extends Submission {
  @ApiProperty({ type: AllTestsResult })
  testResults: AllTestsResult;
}

export class CreateSubmissionDto {
  @ApiProperty({ type: String, description: 'Question ID.' })
  @IsString()
  questionId: Question['id'];

  @ApiProperty({ type: String, description: 'User input code for submit' })
  @IsString()
  code: string;
}

export class CreateSubmissionResponse extends CoreApiResponse<CreatedSubmissionAndTestResult> {
  @ApiProperty({ type: CreatedSubmissionAndTestResult })
  public data: CreatedSubmissionAndTestResult;
}

export type CreateSubmissionInput = CreateSubmissionDto & {
  userId: User['id'];
};
