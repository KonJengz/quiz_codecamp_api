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
import mongoose, { mongo } from 'mongoose';

type QuestionDocument = QuestionSchemaClass & {
  category?: CategorySchemaClass[] | CategorySchemaClass;
  submissions?: SubmissionSchemaClass[];
};

export class QuestionMapper {
  public static toDomain(
    documentEntity: QuestionDocument,
    allFields: boolean = false,
  ): Question {
    if (!documentEntity) return null;
    let id;
    let rest;

    let categoryDoc;
    let testCasesDoc;

    let category: CategoryForQuestion;

    if (documentEntity.toObject) {
      const {
        idDoc,
        category: category,
        testCases: testCases,
        ...restDoc
      } = documentEntity.toObject();

      rest = restDoc;
      id = idDoc;
      categoryDoc = category;
      testCasesDoc = testCases;
    } else {
      const {
        _id,
        testCases,
        category: categoryDoc,
        ...restDoc
      } = documentEntity;
      rest = restDoc;
      id = _id.toString();

      const { _id: categoryId, ...restCatego } =
        categoryDoc as CategorySchemaClass & { _id: mongoose.Types.ObjectId };

      category = { ...restCatego, id: _id.toString() };
    }

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

  public static findManyQueryToDomain(questions: QuestionDocument) {}
}
