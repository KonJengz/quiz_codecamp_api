import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import { Question } from '../../domain/question.domain';
import { QuestionSchemaClass } from '../entities/questions.entity';
import { TestCaseMapper } from 'src/resources/test-cases/repository/mapper/test-case.mapper';

type QuestionDocument = QuestionSchemaClass & {
  category?: CategorySchemaClass[];
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
    const { _id, name, isChallenge } = categoryDoc[0];
    const category = { id: _id.toString(), name, isChallenge };
    const questionDomain = new Question({
      ...rest,
      id,
      category: category,
    });

    if (allFields)
      questionDomain.testCases = testCasesDoc.map(TestCaseMapper.toDomain);

    return questionDomain;
  }
}
