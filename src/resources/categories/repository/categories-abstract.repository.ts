import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Category, MyCategory } from '../domain/categories.domain';
import { User } from 'src/resources/users/domain/user.domain';
import { CategoriesQueriesOption } from '../dto/get.dto';

export abstract class CategoriesRepository extends Repository<Category> {
  abstract override findById(id: string): Promise<Category>;
  abstract override findMany(
    options?: CategoriesQueriesOption,
  ): Promise<Category[]>;

  abstract findByName(name: Category['name']): Promise<Category>;

  abstract findMyCategories(
    userId: User['id'],
    options?: CategoriesQueriesOption,
  ): Promise<MyCategory[]>;

  abstract count(): Promise<number>;

  abstract seeds(): Promise<unknown>;

  abstract deleteAll(): Promise<void>;
}
