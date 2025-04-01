import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Question } from '../domain/question.domain';
import { NullAble } from 'src/common/types/types';

export abstract class QuestionRepository extends Repository<Question> {
  abstract findByTitle(title: Question['title']): Promise<NullAble<Question>>;
}
