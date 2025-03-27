import { CoreApiResponse } from 'src/core/api-response';
import { Category } from '../domain/categories.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { AtleastOneProperty } from 'src/utils/validators/AtleastOneProp';

export class UpdateCategoryResponse extends CoreApiResponse<Category> {}

@AtleastOneProperty(UpdateCategoryDto.updatableFields())
export class UpdateCategoryDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  categoryId: Category['id'];

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: Category['name'];

  @ApiProperty({ type: String, required: false })
  @IsBoolean()
  @IsOptional()
  isChallenge?: Category['isChallenge'];

  public static updatableFields(): (keyof UpdateCategoryDto)[] {
    return ['name', 'isChallenge'];
  }
}
