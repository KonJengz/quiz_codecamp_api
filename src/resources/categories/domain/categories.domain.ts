import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { Question } from 'src/resources/questions/domain/question.domain';

export class Category<TQuestions = string> extends BaseDomain {
  @ApiProperty({ type: String, example: 'Array' })
  name: string;
  @ApiProperty({ type: Boolean, example: 'false' })
  isChallenge: boolean;

  @ApiProperty({ type: [String], example: [''] })
  questions: TQuestions[];

  constructor({
    id,
    name,
    questions,
    isChallenge,
    createdAt,
    updatedAt,
    deletedAt,
  }: Category<TQuestions>) {
    super({ id, createdAt, updatedAt, deletedAt });
    this.name = name;
    this.isChallenge = isChallenge;
    this.questions = questions;
  }
}

export class QuestionInCategoryList {
  @ApiProperty({ type: String, example: '67fcc1ad3dfd9aaccee326c4' })
  public questionId: Question['id'];
  @ApiProperty({ type: String, example: 'Fizz Buzz' })
  public title: Question['title'];
}

export class QuestionAndSolveStatus extends QuestionInCategoryList {
  @ApiProperty({ type: Boolean, example: true })
  public isSolved: boolean;
}

export class MyCategory extends Category<Question['id']> {
  @ApiProperty({ type: [String], example: ['dfs', 'sfssdxefdsfdsf'] })
  public solvedQuestions: Question['id'][];

  constructor(input: MyCategory) {
    const {
      id,
      createdAt,
      isChallenge,
      name,
      questions,
      solvedQuestions,
      updatedAt,
      deletedAt,
    } = input;
    super({
      id,
      createdAt,
      isChallenge,
      name,
      questions,
      updatedAt,
      deletedAt,
    });

    this.solvedQuestions = solvedQuestions;
  }
}
