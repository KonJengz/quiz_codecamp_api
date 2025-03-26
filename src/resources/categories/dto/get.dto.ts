import { CoreApiResponse } from 'src/core/api-response';
import { Category } from '../domain/categories.domain';
import { ApiProperty } from '@nestjs/swagger';

export class GetManyCategoriesResponse extends CoreApiResponse<Category[]> {
  @ApiProperty({ type: Array<Category> })
  data: Category[];
}
