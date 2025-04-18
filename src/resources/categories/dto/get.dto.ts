import { CoreApiResponse } from 'src/core/api-response';
import {
  Category,
  MyCategory,
  QuestionAndSolveStatus,
  QuestionInCategoryList,
} from '../domain/categories.domain';
import { ApiProperty } from '@nestjs/swagger';
import { DomainQueryTypes } from 'src/common/types/products-shared.type';

export class GetManyCategoriesResponse extends CoreApiResponse<
  Array<Category>
> {
  @ApiProperty({
    type: [Category],
    example: [
      {
        id: '67fcc1ad3dfd9aaccee326aa',
        createdAt: '4/14/2025, 3:05:01 PM',
        updatedAt: '4/14/2025, 3:05:01 PM',
        deletedAt: null,
        name: 'Conditional',
        isChallenge: false,
        questions: [],
      },
    ],
  })
  data: Category[];
}

export class GetCategoryByIdResponse extends CoreApiResponse<
  Omit<Category, 'questions'>
> {
  @ApiProperty({
    type: [Category],
    example: {
      id: '67fcc1ad3dfd9aaccee326aa',
      createdAt: '4/14/2025, 3:05:01 PM',
      updatedAt: '4/14/2025, 3:05:01 PM',
      deletedAt: null,
      name: 'Conditional',
      isChallenge: false,
    },
  })
  data: Omit<Category, 'questions'>;
}

export class GetCategoryByIdIncludeQuestionsResponse extends CoreApiResponse<
  Category<QuestionInCategoryList>
> {
  @ApiProperty({
    type: Category,
    example: {
      id: '67fcc1ad3dfd9aaccee326ab',
      createdAt: '4/14/2025, 3:05:01 PM',
      updatedAt: '4/14/2025, 3:05:01 PM',
      deletedAt: null,
      name: 'Loop',
      isChallenge: false,
      questions: [
        {
          questionId: '67fcc1ad3dfd9aaccee326bf',
          title: 'Fizz Buzz',
          id: '67fcc1ad3dfd9aaccee326bf',
        },
        {
          questionId: '67fcc1ad3dfd9aaccee326c4',
          title: 'Factorial',
          id: '67fcc1ad3dfd9aaccee326c4',
        },
      ],
    },
  })
  data: Category<QuestionInCategoryList>;
}

export class GetMyCategoriesResponse extends CoreApiResponse<MyCategory[]> {
  @ApiProperty({
    type: [MyCategory],
    example: [
      {
        id: '67f6139a1593ba838ef30125',
        createdAt: '4/9/2025, 1:28:42 PM',
        updatedAt: '4/9/2025, 1:35:20 PM',
        deletedAt: null,
        name: 'Array',
        isChallenge: false,
        questions: ['67f6152855cb1fe5b442ff90'],
        solvedQuestions: ['67f6152855cb1fe5b442ff90'],
      },
    ],
  })
  data: MyCategory[];
}

export class GetCategoryByIdIncludeQuestionsAndMe extends CoreApiResponse<
  Category<QuestionAndSolveStatus>
> {
  @ApiProperty({
    type: [MyCategory],
    example: {
      id: '67fcc1ad3dfd9aaccee326ab',
      createdAt: '4/14/2025, 3:05:01 PM',
      updatedAt: '4/14/2025, 3:05:01 PM',
      deletedAt: null,
      name: 'Loop',
      isChallenge: false,
      questions: [
        {
          questionId: '67fcc1ad3dfd9aaccee326c4',
          isSolved: true,
          title: 'Factorial',
        },
        {
          questionId: '67fcc1ad3dfd9aaccee326bf',
          isSolved: false,
          title: 'Fizz Buzz',
        },
      ],
    },
  })
  data: Category<QuestionAndSolveStatus>;
}

export interface CategoriesQueriesOption extends DomainQueryTypes {
  isChallenge?: 'true' | 'false';
}
