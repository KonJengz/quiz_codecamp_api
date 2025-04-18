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
  @ApiProperty({
    type: Question,
    example: {
      id: '6800dae75b4c2356523955b2',
      createdAt: '4/17/2025, 5:41:43 PM',
      updatedAt: '4/18/2025, 11:13:37 AM',
      deletedAt: null,
      title: 'ประกาศตัวแปร',
      description: 'ประกาศตัวแปร',
      variableName: 'firstName',
      solution: "let firstName = 'John'",
      starterCode: '/** Declare the firstName variable as your name  */',
      category: {
        id: '67fe52909328c002ff7724a1',
        name: 'String',
        isChallenge: false,
      },
      testCases: [
        {
          id: '6800dae75b4c2356523955b3',
          createdAt: '4/17/2025, 5:41:43 PM',
          updatedAt: '4/17/2025, 5:41:43 PM',
          deletedAt: null,
          input: [],
          expected: 'null',
          matcher: 'toBe',
          not: true,
        },
      ],
    },
  })
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
