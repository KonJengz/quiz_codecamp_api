import * as nestType from '@nestjs/common';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { Question } from '../domain/question.domain';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CoreApiResponse } from 'src/core/api-response';
import { TestCase } from 'src/resources/test-cases/domain/test-cases.domain';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';
import { CreateQuestionAndTestCaseValidator } from 'src/utils/validators/CreateQuestionAndTestCase.validator';

export class CreateTestCaseSimulWithQuestion {
  @ApiProperty({
    example: [10, 11],
    required: false,
    description:
      'Only provide this field when the question or test-case which desire to test is function code and need parameter to proceed.',
  })
  @IsArray()
  @IsOptional()
  input?: TestCase['input'];
  @ApiProperty({
    enum: TestCaseMatcherEnum,
    type: String,
    example: TestCaseMatcherEnum.toBe,
    required: false,
  })
  @IsEnum(TestCaseMatcherEnum)
  matcher: TestCaseMatcherEnum;
  @ApiProperty({ type: String, required: false, example: 'firstName' })
  @IsString()
  @IsOptional()
  variable?: string;
  @ApiProperty({ type: Boolean, required: false, example: true })
  @IsOptional()
  not?: boolean;
  @ApiProperty({
    examples: [[1, 2, 'Fizz', 4, 'Buzz'], 'foo bar', 45],
    required: true,
  })
  @IsNotEmpty()
  expected: TestCase['expected'];
}

@CreateQuestionAndTestCaseValidator()
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
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isFunction: boolean;
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(5)
  solution: Question['solution'];
  @ApiProperty({ type: [CreateTestCaseSimulWithQuestion] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestCaseSimulWithQuestion)
  testCases: CreateTestCaseSimulWithQuestion[];

  public static get testCasesFieldName(): 'testCases' {
    return 'testCases';
  }
  public static get isFunctionFieldName(): 'isFunction' {
    return 'isFunction';
  }
  public static get solutionFieldName(): 'solution' {
    return 'solution';
  }
}

export class CreateQuestionResponse extends CoreApiResponse<Question> {
  @ApiProperty({ type: Question })
  data: Question;
}
