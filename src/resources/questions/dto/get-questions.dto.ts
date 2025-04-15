import { CoreApiResponse } from 'src/core/api-response';
import {
  ManyQuestionsDataType,
  Question,
  QuestionAndSubmission,
} from '../domain/question.domain';
import { ApiProperty } from '@nestjs/swagger';

export class GetManyQuestionsResponse extends CoreApiResponse<
  ManyQuestionsDataType[]
> {
  @ApiProperty({ type: [ManyQuestionsDataType] })
  data: ManyQuestionsDataType[];
}

export class GetQuestionByIdResponse extends CoreApiResponse<Question> {
  @ApiProperty({ type: Question })
  data: Question;
}

export class GetQuestionByIdAndMySubmissionReponse extends CoreApiResponse<QuestionAndSubmission> {
  @ApiProperty({ type: QuestionAndSubmission })
  data: QuestionAndSubmission;
}

// export class GetQuestionsByCategoryIdResponse extends CoreApiResponse<
//   ManyQuestionsDataType[]
// > {
//   @ApiProperty({ type: [ManyQuestionsDataType] })
//   data: ManyQuestionsDataType[];
// }
