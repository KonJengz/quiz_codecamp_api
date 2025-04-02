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
  @ApiProperty({ type: [MyCategory] })
  data: MyCategory[];
}
