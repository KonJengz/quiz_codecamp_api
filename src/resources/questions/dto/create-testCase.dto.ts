import { Question } from '../domain/question.domain';
import { TestCase } from '../domain/testCase.domain';

export class CreateTestCaseDto {
  questionId: Question['id'];
  input: TestCase['input'];
  output: TestCase['output'];
}
