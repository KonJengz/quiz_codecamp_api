import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Question, QuestionAndSubmission } from '../domain/question.domain';
import { NullAble } from 'src/common/types/types';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { User } from 'src/resources/users/domain/user.domain';
import { DomainQueryTypes } from 'src/common/types/products-shared.type';
import { CategoriesQueriesOption } from 'src/resources/categories/dto/get.dto';

export abstract class QuestionRepository {
  abstract create(data: CreateQuestionDto): Promise<Question>;

  abstract findById(id: Question['id']): Promise<NullAble<Question>>;

  abstract findMany(options: CategoriesQueriesOption): Promise<Array<Question>>;

  abstract update<U extends Partial<Omit<Question, 'id'>>>(
    data: U,
    id: Question['id'],
  ): Promise<Question>;
  abstract findByTitle(title: Question['title']): Promise<NullAble<Question>>;
  abstract findByCategoryId(
    categoryId: Category['id'],
    options: DomainQueryTypes,
  ): Promise<Question[]>;

  abstract findByIdAndUserSubmission(
    id: Question['id'],
    userId: User['id'],
  ): Promise<QuestionAndSubmission>;
}
