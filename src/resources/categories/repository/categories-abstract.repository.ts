import { Repository } from 'src/infrastructure/persistence/config/repository';
<<<<<<< HEAD
import { Category, MyCategory } from '../domain/categories.domain';
import { User } from 'src/resources/users/domain/user.domain';

export abstract class CategoriesRepository extends Repository<Category> {
  abstract findByName(name: Category['name']): Promise<Category>;

  abstract findMyCategories(userId: User['id']): Promise<MyCategory[]>;
=======
import { Category } from '../domain/categories.domain';

export abstract class CategoriesRepository extends Repository<Category> {
  abstract findByName(name: Category['name']): Promise<Category>;
>>>>>>> origin/main
}
