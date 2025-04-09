import mongoose from 'mongoose';
import { Category, MyCategory } from '../../domain/categories.domain';
import { CategorySchemaClass } from '../entities/category.entity';

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
    documentEntity: CategorySchemaClass,
  ): MyCategory {
    return new MyCategory(documentEntity.toObject());
  }
}
