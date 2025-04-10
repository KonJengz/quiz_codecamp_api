import mongoose from 'mongoose';
import { Category, MyCategory } from '../../domain/categories.domain';
import { CategorySchemaClass } from '../entities/category.entity';
import { MyCategoryQueried } from '../categories.repository';

export class CategoryMapper {
  public static toDomain(documentEntity: CategorySchemaClass): Category {
    // If there are no document entity provided, return null
    if (!documentEntity) return null;
    const docObj = documentEntity.toObject();

    if (docObj.questions.length > 0)
      docObj.questions = docObj.questions.map((item: mongoose.Types.ObjectId) =>
        item.toString(),
      );

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
}
