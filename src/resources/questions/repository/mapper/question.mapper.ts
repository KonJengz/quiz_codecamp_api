import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import {
  CategoryForQuestion,
  Question,
  QuestionAndSubmission,
} from '../../domain/question.domain';
import { QuestionSchemaClass } from '../entities/questions.entity';
import { TestCaseMapper } from 'src/resources/test-cases/repository/mapper/test-case.mapper';
import { SubmissionSchemaClass } from 'src/resources/submissions/repository/entities/submissions.entity';
import { SubmissionMapper } from 'src/resources/submissions/repository/mapper/submission.mapper';

type QuestionDocument = QuestionSchemaClass & {
  category?: CategorySchemaClass[];
  submissions?: SubmissionSchemaClass[];
};

export class QuestionMapper {
  public static toDomain(
    documentEntity: QuestionDocument,
    allFields: boolean = false,
  ): Question {
    if (!documentEntity) return null;
    const {
      id,
      category: categoryDoc,
      testCases: testCasesDoc,
      ...rest
    } = documentEntity.toObject();

    let category: CategoryForQuestion;

    const questionDomain = new Question({
      ...rest,
      id,
    });

    if (categoryDoc && categoryDoc[0]) {
      const { _id, name, isChallenge } = categoryDoc[0];
      category = { id: _id.toString(), name, isChallenge };
    }

    if (category) questionDomain.category = category;
    if (allFields)
      questionDomain.testCases = testCasesDoc.map(TestCaseMapper.toDomain);

    return questionDomain;
  }

  public static toDomainWithSubmission(
    documentEntity: QuestionDocument,
    submission: SubmissionSchemaClass,
  ): QuestionAndSubmission {
    const questionDomain = QuestionMapper.toDomain(documentEntity);

    const submissionDomain = SubmissionMapper.toDomain(submission);

    return new QuestionAndSubmission({
      ...questionDomain,
      submission: submissionDomain,
    });
  }
}
