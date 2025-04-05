import { Category } from 'src/resources/categories/domain/categories.domain';
import { Question } from '../domain/question.domain';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CoreApiResponse } from 'src/core/api-response';
import { TestCase } from 'src/resources/test-cases/domain/test-cases.domain';

export class CreateTestCaseSimulWithQuestion {
  id: null;
  createdAt: null;
  updatedAt: null;
  deletedAt: null;
  @ApiProperty()
  @IsNotEmpty()
  input: TestCase['input'];
  @ApiProperty({ type: String })
  @IsNotEmpty()
  output: TestCase['output'];
}

class TestVariable {
  @ApiProperty({ type: String })
  @IsString()
  variableName: Question['variableName'];

  @ApiProperty({ type: String })
  @IsBoolean()
  isFunction: boolean;
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
  @ApiProperty({ type: TestVariable })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => TestVariable)
  testVariable: TestVariable;
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(5)
  solution: Question['solution'];
  @ApiProperty({ type: [CreateTestCaseSimulWithQuestion] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestCaseSimulWithQuestion)
  testCases: CreateTestCaseSimulWithQuestion[];
}

export class CreateQuestionResponse extends CoreApiResponse<Question> {
  @ApiProperty({ type: Question })
  data: Question;
}
