import { Category } from '../../domain/categories.domain';
import { CategorySchemaClass } from '../entities/category.entity';

export class CategoryMapper {
  public static toDomain(documentEntity: CategorySchemaClass): Category {
    // If there are no document entity provided, return null
    if (!documentEntity) return null;

    const { id, name, isChallenge, createdAt, updatedAt, deletedAt } =
      documentEntity;
    return new Category({
      id,
      name,
      isChallenge,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }
}
