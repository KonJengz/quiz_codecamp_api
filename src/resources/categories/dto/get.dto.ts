import { CoreApiResponse } from 'src/core/api-response';
import { Category, MyCategory } from '../domain/categories.domain';
import { ApiProperty } from '@nestjs/swagger';

export class GetManyCategoriesResponse extends CoreApiResponse<
  Array<Category>
> {
  @ApiProperty({ type: [Category] })
  data: Category[];
}

export class GetByIdCategoriesResponse extends CoreApiResponse<Category> {
  @ApiProperty({ type: Category })
  data: Category;
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

export type CategoriesQueriesOption = {
  isChallenge?: 'true' | 'false';
};
