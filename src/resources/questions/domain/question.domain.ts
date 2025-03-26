type QuestionConstructorInput = Question;

export class Question {
  id: string;
  description: string;
  starterCode: string;
  solution: string;

  constructor(input: QuestionConstructorInput) {
    const { id, description, solution, starterCode } = input;
    this.id = id;
    this.description = description;
    this.solution = solution;
    this.starterCode = starterCode;
  }
}
