import { CoreApiResponse } from 'src/core/api-response';
import { Category } from '../domain/categories.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateCategoryResponse extends CoreApiResponse<Category> {
  @ApiProperty({ type: Category })
  data: Category;
}

export class CreateCategoryDto {
  @ApiProperty({ type: String, example: 'Array' })
  @IsString()
  @MinLength(3)
  name: string;
  @ApiProperty({ type: Boolean, example: 'false' })
  @IsBoolean()
  isChallenge: boolean;
}
