import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Category } from '../domain/categories.domain';

export abstract class CategoriesRepository extends Repository<Category> {
  abstract findByName(name: Category['name']): Promise<Category>;
}
