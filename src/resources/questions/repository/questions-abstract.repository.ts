import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Question } from '../domain/question.domain';

export abstract class QuestionRepository extends Repository<Question> {}
