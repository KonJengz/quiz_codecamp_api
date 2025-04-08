import { Question } from '../../questions/domain/question.domain';
import { TestCase } from '../domain/test-cases.domain';

export class CreateTestCaseDto {
  questionId: Question['id'];
  input: TestCase['input'];
  output: TestCase['output'];
}
