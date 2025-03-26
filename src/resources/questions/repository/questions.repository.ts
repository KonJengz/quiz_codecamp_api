import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './questions-abstract.repository';
import { Question } from '../domain/question.domain';
import { QuestionSchemaClass } from './entities/questions.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionDocumentRepository implements QuestionRepository {
  constructor(
    @InjectModel(QuestionSchemaClass.name)
    private readonly questionModel: Model<QuestionSchemaClass>,
  ) {}
  create<U extends Partial<Question>>(data: U): Question {
    return new Question({
      description: '',
      id: '',
      solution: '',
      starterCode: '',
    });
  }
  findById(id: string): Question {
    return new Question({
      description: '',
      id: '',
      solution: '',
      starterCode: '',
    });
  }
  findMany(): Question[] {
    return [
      new Question({
        description: '',
        id: '',
        solution: '',
        starterCode: '',
      }),
    ];
  }
  update<U extends Partial<Omit<Question, 'id'>>>(data: U): Question {
    return new Question({
      description: '',
      id: '',
      solution: '',
      starterCode: '',
    });
  }
}
