import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
<<<<<<< HEAD
import { Question } from 'src/resources/questions/domain/question.domain';
=======
>>>>>>> origin/main

type CategoryInputConstructor = Category;

export class Category extends BaseDomain {
  @ApiProperty({ type: String, example: 'Array' })
  name: string;
  @ApiProperty({ type: Boolean, example: 'false' })
  isChallenge: boolean;

<<<<<<< HEAD
  @ApiProperty({ type: [String], example: [1, 2, 3] })
  questions: Question['id'][];

  constructor({
    id,
    name,
    questions,
=======
  constructor({
    id,
    name,
>>>>>>> origin/main
    isChallenge,
    createdAt,
    updatedAt,
    deletedAt,
  }: CategoryInputConstructor) {
    super({ id, createdAt, updatedAt, deletedAt });
    this.name = name;
    this.isChallenge = isChallenge;
<<<<<<< HEAD
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
=======
>>>>>>> origin/main
  }
}
