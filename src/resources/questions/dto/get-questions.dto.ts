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
  @ApiProperty({
    type: [ManyQuestionsDataType],
    example: [
      {
        id: '67fe52909328c002ff7724b9',
        createdAt: '4/15/2025, 7:35:28 PM',
        updatedAt: '4/15/2025, 7:35:28 PM',
        deletedAt: null,
        title: 'นับจำนวนสระ',
      },
    ],
  })
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
