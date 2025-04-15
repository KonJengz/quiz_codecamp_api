import { CoreApiResponse } from 'src/core/api-response';
import { Question } from '../domain/question.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { AtleastOneProperty } from 'src/utils/validators/AtleastOneProp';
import { Category } from 'src/resources/categories/domain/categories.domain';

@AtleastOneProperty(UpdateQuestionDto.updatableFields)
export class UpdateQuestionDto {
  @ApiProperty({ type: String, example: '', required: false })
  @MinLength(6)
  @IsString()
  questionId: Question['id'];

  @ApiProperty({ type: String, example: '', required: false })
  @IsString()
  @IsOptional()
  categoryId?: Category['id'];

  @ApiProperty({ type: String, example: 'Array', required: false })
  @IsString()
  @IsOptional()
  title?: Question['title'];

  @ApiProperty({
    type: String,
    example: `เขียนฟังก์ชันที่รับข้อความและคืนค่าจำนวนตัวอักษรทั้งหมด
ตัวอย่างที่ 1
Input: "hello"
Output: 5
ตัวอย่างที่ 2
Input: "codecamp"
Output: 8
ตัวอย่างที่ 3
Input: "Thailand"
Output: 8
`,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: Question['description'];

  @ApiProperty({ type: String, example: 'fizzBuzz', required: false })
  @IsString()
  @IsOptional()
  variableName?: Question['variableName'];

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  starterCode?: Question['starterCode'];

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  solution?: Question['solution'];

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isFunction?: boolean;

  public static get updatableFields(): (keyof UpdateQuestionDto)[] {
    return ['description', 'title'];
  }
}

export class UpdateQuestionResponse extends CoreApiResponse<Question> {
  @ApiProperty({ type: Question })
  data: Question;
}
