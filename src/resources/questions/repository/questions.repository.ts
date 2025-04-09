import { Injectable, Logger } from '@nestjs/common';
import { QuestionRepository } from './questions-abstract.repository';
import { Question } from '../domain/question.domain';
import { QuestionSchemaClass } from './entities/questions.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { NullAble } from 'src/common/types/types';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionMapper } from './mapper/question.mapper';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';

@Injectable()
export class QuestionDocumentRepository implements QuestionRepository {
  private logger: Logger = new Logger(QuestionDocumentRepository.name);
  constructor(
    @InjectModel(QuestionSchemaClass.name)
    private readonly questionModel: Model<QuestionSchemaClass>,
    @InjectModel(CategorySchemaClass.name)
    private readonly categoryModel: Model<CategorySchemaClass>,
    @InjectConnection()
    private readonly mongoConnection: Connection,
  ) {}

  private questionPopulateOption = [
    QuestionSchemaClass.categoryJoinField,
    QuestionSchemaClass.testCaseJoinField,
  ];

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

    // starting transaction
    // const session = await this.mongoConnection.startSession();
    // session.startTransaction();
    // try {
    const createdQuestion = new this.questionModel({
      ...rest,
      ...testVariable,
      testCases,
    });
    await createdQuestion.save();
    // Update the category to have newly created question
    await this.categoryModel.findByIdAndUpdate(createdQuestion.categoryId, {
      $push: { questions: createdQuestion._id },
    });
    // Commit transaction
    // session.commitTransaction();
    // Return the created question
    return QuestionMapper.toDomain(createdQuestion);
    // } catch (err) {
    //   this.logger.error(`There is an error while creating question: \n`);
    //   this.logger.error(err?.message);
    //   // Abort transaction as transction does not succeed.
    //   await session.abortTransaction();
    // } finally {
    //   session.endSession();
    // }
  }

  async findById(id: string): Promise<Question> {
    const question = await this.questionModel
      .findById(id)
      .populate(this.questionPopulateOption);

    return QuestionMapper.toDomain(question);
  }

  async findMany(): Promise<Question[]> {
    const questions = await this.questionModel
      .find()
      .populate(this.questionPopulateOption);
    // If there are no questions, return []
    if (questions.length === 0) return [];
    // Map all of thr question with Mapper
    return questions.map((question) =>
      QuestionMapper.toDomain(question, false),
    );
  }

  async findByTitle(title: Question['title']): Promise<NullAble<Question>> {
    const questionObj = await this.questionModel
      .findOne({ title })
      .populate(this.questionPopulateOption);
    return QuestionMapper.toDomain(questionObj, true);
  }

  async findByCategoryId(categoryId: Category['id']): Promise<Question[]> {
    const questions = await this.questionModel
      .find({ categoryId })
      .populate(this.questionPopulateOption);

    // If there aren't any questions in this category,
    // return []
    if (questions.length === 0) return [];

    return questions.map((question) =>
      QuestionMapper.toDomain(question, false),
    );
  }

  update<U extends Partial<Omit<Question, 'id'>>>(
    data: U,
    id: string,
  ): Promise<Question> {
    return Promise.resolve(this.mockQuestion);
  }
}
