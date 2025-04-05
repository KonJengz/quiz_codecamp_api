import { Injectable, Logger } from '@nestjs/common';
import { QuestionRepository } from './questions-abstract.repository';
import { Question } from '../domain/question.domain';
import { QuestionSchemaClass } from './entities/questions.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { NullAble } from 'src/common/types/types';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionMapper } from './mapper/question.mapper';

@Injectable()
export class QuestionDocumentRepository implements QuestionRepository {
  private logger: Logger = new Logger(QuestionDocumentRepository.name);
  constructor(
    @InjectModel(QuestionSchemaClass.name)
    private readonly questionModel: Model<QuestionSchemaClass>,
    @InjectConnection()
    private readonly mongoConnection: Connection,
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

  async create(data: CreateQuestionDto): Promise<Question> {
    const { testCases, testVariable, ...rest } = data;
    const { variableName } = testVariable;

    // starting transaction
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const createdQuestion = await this.questionModel.create(
        [
          {
            ...rest,
            variableName,
            testCases,
          },
        ],
        { session },
      );
      // Commit transaction
      session.commitTransaction();
      // Return the created question
      return QuestionMapper.toDomain(createdQuestion[0]);
    } catch (err) {
      this.logger.error(`There is an error while creating question: \n`);
      this.logger.error(err?.message);
      // Abort transaction as transction does not succeed.
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }

  findById(id: string): Promise<Question> {
    return Promise.resolve(this.mockQuestion);
  }
  findMany(): Promise<Question[]> {
    return Promise.resolve([this.mockQuestion]);
  }
  async findByTitle(title: Question['title']): Promise<NullAble<Question>> {
    const questionObj = await this.questionModel.findOne({ title });
    return QuestionMapper.toDomain(questionObj);
  }
  update<U extends Partial<Omit<Question, 'id'>>>(
    data: U,
    id: string,
  ): Promise<Question> {
    return Promise.resolve(this.mockQuestion);
  }
}
