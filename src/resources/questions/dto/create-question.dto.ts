import { Category } from 'src/resources/categories/domain/categories.domain';
import { Question } from '../domain/question.domain';
import { CreateTestCaseDto } from './create-testCase.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TestCase } from '../domain/testCase.domain';
import { CoreApiResponse } from 'src/core/api-response';

class CreateTestCaseSimulWithQuestion {
  @IsString()
  input: TestCase['input'];
  @IsString()
  output: TestCase['output'];
}

export class CreateQuestionDto {
  @ApiProperty({ type: String })
  @IsString()
  categoryId: Category['id'];

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(3)
  title: Question['title'];

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(12)
  description: Question['description'];
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(5)
  starterCode: Question['starterCode'];
  @ApiProperty({ type: String })
  @IsString()
  variableName: Question['variableName'];
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(5)
  solution: Question['solution'];
  @ApiProperty({ type: [CreateTestCaseSimulWithQuestion] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestCaseSimulWithQuestion)
  testCase: CreateTestCaseSimulWithQuestion[];
}

export class CreateQuestionResponse extends CoreApiResponse<Question> {
  @ApiProperty({ type: Question })
  data: Question;
}
