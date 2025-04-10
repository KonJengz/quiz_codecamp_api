import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Question, QuestionAndSubmission } from '../domain/question.domain';
import { NullAble } from 'src/common/types/types';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { User } from 'src/resources/users/domain/user.domain';

export abstract class QuestionRepository extends Repository<
  Question,
  CreateQuestionDto
> {
  abstract create(data: CreateQuestionDto): Promise<Question>;
  abstract findByTitle(title: Question['title']): Promise<NullAble<Question>>;
  abstract findByCategoryId(categoryId: Category['id']): Promise<Question[]>;

  abstract findByIdAndUserSubmission(
    id: Question['id'],
    userId: User['id'],
  ): Promise<QuestionAndSubmission>;
}
