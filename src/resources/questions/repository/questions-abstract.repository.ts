import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Question } from '../domain/question.domain';
import { NullAble } from 'src/common/types/types';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Category } from 'src/resources/categories/domain/categories.domain';

export abstract class QuestionRepository extends Repository<
  Question,
  CreateQuestionDto
> {
  abstract create(data: CreateQuestionDto): Promise<Question>;
  abstract findByTitle(title: Question['title']): Promise<NullAble<Question>>;
  abstract findByCategoryId(categoryId: Category['id']): Promise<Question[]>;
}
