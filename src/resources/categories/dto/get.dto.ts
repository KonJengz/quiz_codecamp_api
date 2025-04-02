import { CoreApiResponse } from 'src/core/api-response';
<<<<<<< HEAD
import { Category, MyCategory } from '../domain/categories.domain';
=======
import { Category } from '../domain/categories.domain';
>>>>>>> origin/main
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
<<<<<<< HEAD

export class GetMyCategoriesResponse extends CoreApiResponse<MyCategory[]> {
  @ApiProperty({ type: [MyCategory] })
  data: MyCategory[];
}
=======
>>>>>>> origin/main
