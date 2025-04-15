import mongoose from 'mongoose';
import {
  Category,
  MyCategory,
  QuestionAndSolveStatus,
} from '../../domain/categories.domain';
import { CategorySchemaClass } from '../entities/category.entity';
import { MyCategoryQueried } from '../categories.repository';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';
import { Question } from 'src/resources/questions/domain/question.domain';

type QuestionDetailInCategorySchema = {
  _id: mongoose.Types.ObjectId;
  id?: string;
  title: QuestionSchemaClass['title'];
  isSolved: boolean;
};

export class CategoryMapper {
  public static toDomain<T = string>(
    documentEntity: CategorySchemaClass,
  ): Category<T> {
    // If there are no document entity provided, return null
    if (!documentEntity) return null;
    if (documentEntity.toObject) {
    }
    const docObj = documentEntity.toObject
      ? documentEntity.toObject()
      : documentEntity;

    if (docObj.questions.length > 0) {
      docObj.questions = docObj.questions.map(
        CategoryMapper.mappingQuestionsField,
      );
    }

    return new Category({ ...docObj, id: docObj._id.toString() });
  }

  public static toMyCategoryDomain(
    documentEntity: MyCategoryQueried,
  ): MyCategory {
    const {
      _id,
      questions: qBuffer,
      solvedQuestions: sQBuffer,
      ...rest
    } = documentEntity;
    const questions = qBuffer.map((buffer) => buffer.toString());
    const solvedQuestions = sQBuffer.map((buffer) => buffer.toString());
    return new MyCategory({
      ...rest,
      id: _id.toString(),
      questions,
      solvedQuestions,
    });
  }

  private static mappingQuestionsField(
    question: mongoose.Types.ObjectId | QuestionDetailInCategorySchema,
  ): Question['id'] | QuestionAndSolveStatus {
    const questionDetailsKey = { title: true, isSolved: true };
    const questionKeys = Object.keys(question);

    if (questionKeys.some((key) => questionDetailsKey[key])) {
      const { _id, id, ...rest } = question as QuestionDetailInCategorySchema;

      return { questionId: _id.toString(), ...rest };
    }

    return question.toString();
  }
}
