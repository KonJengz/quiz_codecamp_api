import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { TestCase } from './testCase.domain';

type QuestionConstructorInput = Question;

class CategoryForQuestion {
  @ApiProperty({ type: String })
  id: Category['id'];
  @ApiProperty({ type: String })
  name: Category['name'];
  @ApiProperty({ type: Boolean })
  isChallenge: Category['isChallenge'];
}

export class Question extends BaseDomain {
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: String })
  starterCode: string;
  @ApiProperty({ type: String })
  solution: string;
  @ApiProperty({ type: CategoryForQuestion })
  category: CategoryForQuestion;
  @ApiProperty({ type: String })
  variableName: string;

  @ApiProperty({ type: TestCase })
  testCases: TestCase[];

  constructor(input: QuestionConstructorInput) {
    const {
      id,
      description,
      solution,
      starterCode,
      category,
      createdAt,
      title,
      variableName,
      updatedAt,
      deletedAt,
    } = input;

    super({ id, createdAt, updatedAt, deletedAt });

    this.title = title;
    this.description = description;
    this.variableName = variableName;
    this.solution = solution;
    this.starterCode = starterCode;
    this.category = category;
  }
}
