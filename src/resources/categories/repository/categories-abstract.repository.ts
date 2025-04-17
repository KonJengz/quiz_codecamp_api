import { Repository } from 'src/infrastructure/persistence/config/repository';
import {
  Category,
  MyCategory,
  QuestionAndSolveStatus,
} from '../domain/categories.domain';
import { User } from 'src/resources/users/domain/user.domain';
import { CategoriesQueriesOption } from '../dto/get.dto';

export abstract class CategoriesRepository extends Repository<Category> {
  abstract override findById<T>(
    id: string,
    includeQuestions: boolean,
  ): Promise<Category<T>>;
  abstract override findMany(
    options?: CategoriesQueriesOption,
  ): Promise<Category[]>;

  abstract findByName(name: Category['name']): Promise<Category>;

  abstract findMyCategories(
    userId: User['id'],
    options?: CategoriesQueriesOption,
  ): Promise<MyCategory[]>;

  abstract findByIdIncludeUserDetail(
    id: Category['id'],
    userId: User['id'],
  ): Promise<Category<QuestionAndSolveStatus>>;

  abstract count(): Promise<number>;

  abstract seeds(): Promise<unknown>;

  abstract deleteAll(): Promise<void>;
}
