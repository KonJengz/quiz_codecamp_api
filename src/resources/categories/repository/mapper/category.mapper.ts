<<<<<<< HEAD
import { Category, MyCategory } from '../../domain/categories.domain';
=======
import { Category } from '../../domain/categories.domain';
>>>>>>> origin/main
import { CategorySchemaClass } from '../entities/category.entity';

export class CategoryMapper {
  public static toDomain(documentEntity: CategorySchemaClass): Category {
    // If there are no document entity provided, return null
    if (!documentEntity) return null;

    return new Category(documentEntity.toObject());
  }
<<<<<<< HEAD

  public static toMyCategoryDomain(
    documentEntity: CategorySchemaClass,
  ): MyCategory {
    return new MyCategory(documentEntity.toObject());
  }
=======
>>>>>>> origin/main
}
