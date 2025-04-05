import { Question } from '../../domain/question.domain';
import { QuestionSchemaClass } from '../entities/questions.entity';

export class QuestionMapper {
  public static toDomain(documentEntity: QuestionSchemaClass): Question {
    if (!documentEntity) return null;
    console.log('Question mapper: ', documentEntity);

    const { _id, ...rest } = documentEntity.toObject();
    return new Question({ ...rest, id: _id.toString() });
  }
}
