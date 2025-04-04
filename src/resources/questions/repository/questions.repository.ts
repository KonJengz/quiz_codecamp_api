import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './questions-abstract.repository';
import { Question } from '../domain/question.domain';
import { QuestionSchemaClass } from './entities/questions.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullAble } from 'src/common/types/types';

@Injectable()
export class QuestionDocumentRepository implements QuestionRepository {
  constructor(
    @InjectModel(QuestionSchemaClass.name)
    private readonly questionModel: Model<QuestionSchemaClass>,
  ) {}
  private mockQuestion = new Question({
    id: '',
    variableName: '',
    category: { id: '', isChallenge: false, name: '' },
    testCases: [],
    title: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    description: '',
    solution: '',
    starterCode: '',
  });

  create<U extends Partial<Question>>(data: U): Promise<Question> {
    return Promise.resolve(this.mockQuestion);
  }
  findById(id: string): Promise<Question> {
    return Promise.resolve(this.mockQuestion);
  }
  findMany(): Promise<Question[]> {
    return Promise.resolve([this.mockQuestion]);
  }
  findByTitle(title: Question['title']): Promise<NullAble<Question>> {
    return Promise.resolve(this.mockQuestion);
  }
  update<U extends Partial<Omit<Question, 'id'>>>(
    data: U,
    id: string,
  ): Promise<Question> {
    return Promise.resolve(this.mockQuestion);
  }
}
