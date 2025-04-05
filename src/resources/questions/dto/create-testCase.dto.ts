import { Question } from '../domain/question.domain';
import { TestCase } from '../../test-cases/domain/test-cases.domain';

export class CreateTestCaseDto {
  questionId: Question['id'];
  input: TestCase['input'];
  output: TestCase['output'];
}
