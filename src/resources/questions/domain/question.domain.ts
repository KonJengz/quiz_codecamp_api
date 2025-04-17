import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { TestCase } from '../../test-cases/domain/test-cases.domain';
import { Submission } from 'src/resources/submissions/domain/submission.domain';
import { Exclude, Expose } from 'class-transformer';

type QuestionConstructorInput = Question;

export class CategoryForQuestion {
  @ApiProperty({ type: String })
  id: Category['id'];
  @ApiProperty({ type: String })
  name: Category['name'];
  @ApiProperty({ type: Boolean })
  isChallenge: Category['isChallenge'];

  constructor({
    id,
    name,
    isChallenge,
  }: {
    id: CategoryForQuestion['id'];
    name: CategoryForQuestion['name'];
    isChallenge: CategoryForQuestion['isChallenge'];
  }) {
    this.id = id;
    this.name = name;
    this.isChallenge = isChallenge;
  }
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
  @Exclude({ toPlainOnly: true })
  isFunction: boolean;
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
      testCases,
      isFunction,
      deletedAt,
    } = input;

    super({ id, createdAt, updatedAt, deletedAt });

    this.title = title;
    this.description = description;
    this.variableName = variableName;
    this.solution = solution;
    this.starterCode = starterCode;
    this.category = category;
    this.testCases = testCases;
    this.isFunction = isFunction;
  }
}

export class ManyQuestionsDataType {
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
}

export class QuestionAndSubmission extends Question {
  @ApiProperty({ type: Submission })
  submission: Submission;

  constructor(input: QuestionAndSubmission) {
    const { submission, ...rest } = input;
    super(rest);
    this.submission = submission;
  }
}
