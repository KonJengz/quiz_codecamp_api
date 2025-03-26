import { CoreApiResponse } from 'src/core/api-response';
import { Category } from '../domain/categories.domain';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryResponse extends CoreApiResponse<Category> {
  @ApiProperty({ type: Category })
  data: Category;
}
