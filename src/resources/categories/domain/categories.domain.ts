import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { Question } from 'src/resources/questions/domain/question.domain';

type CategoryInputConstructor = Category;

export class Category extends BaseDomain {
  @ApiProperty({ type: String, example: 'Array' })
  name: string;
  @ApiProperty({ type: Boolean, example: 'false' })
  isChallenge: boolean;

  @ApiProperty({ type: [String], example: [''] })
  questions: Question['id'][];

  constructor({
    id,
    name,
    questions,
    isChallenge,
    createdAt,
    updatedAt,
    deletedAt,
  }: CategoryInputConstructor) {
    super({ id, createdAt, updatedAt, deletedAt });
    this.name = name;
    this.isChallenge = isChallenge;
    this.questions = questions;
  }
}

export class MyCategory extends Category {
  @ApiProperty({ type: [String], example: ['dfs', 'sfssdxefdsfdsf'] })
  solvedQuestions: Question['id'][];

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
