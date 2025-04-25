import { Injectable, Logger } from '@nestjs/common';
import { QuestionRepository } from './questions-abstract.repository';
import { Question, QuestionAndSubmission } from '../domain/question.domain';
import { QuestionSchemaClass } from './entities/questions.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullAble } from 'src/common/types/types';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionMapper } from './mapper/question.mapper';
import { Category } from 'src/resources/categories/domain/categories.domain';
import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import { User } from 'src/resources/users/domain/user.domain';
import { SubmissionSchemaClass } from 'src/resources/submissions/repository/entities/submissions.entity';
import {
  DomainQueryTypes,
  DomainStatusEnums,
} from 'src/common/types/products-shared.type';
import { MongoRepositoryHelper } from 'src/infrastructure/persistence/config/mongodb/mongo.repository';
import { CategoriesQueriesOption } from 'src/resources/categories/dto/get.dto';
import { ObjectHelper } from 'src/utils/object.helper';

@Injectable()
export class QuestionDocumentRepository implements QuestionRepository {
  private logger: Logger = new Logger(QuestionDocumentRepository.name);
  constructor(
    @InjectModel(QuestionSchemaClass.name)
    private readonly questionModel: Model<QuestionSchemaClass>,
    @InjectModel(CategorySchemaClass.name)
    private readonly categoryModel: Model<CategorySchemaClass>,
  ) {}

  private questionPopulateOption = [
    QuestionSchemaClass.categoryJoinField,
    QuestionSchemaClass.testCaseJoinField,
  ];

  private questionPopulateQuery = [
    {
      path: QuestionSchemaClass.categoryJoinField,
    },
    {
      path: QuestionSchemaClass.testCaseJoinField,
    },
  ];

  async create(data: CreateQuestionDto): Promise<Question> {
    const { testCases, ...rest } = data;

    const createdQuestion = new this.questionModel({
      ...rest,
      testCases,
    });
    await createdQuestion.save();

    await this.categoryModel.findByIdAndUpdate(createdQuestion.categoryId, {
      $push: { questions: createdQuestion._id },
    });

    return QuestionMapper.toDomain(createdQuestion);
  }

  async findById(id: string): Promise<Question> {
    const question = await this.questionModel
      .findById(id)
      .populate(this.questionPopulateQuery);

    return QuestionMapper.toDomain(question, true);
  }

  async findMany(options: CategoriesQueriesOption): Promise<Question[]> {
    const { isChallengeOption, statusOption } = this.filterOptions(options);

    const questions = await this.categoryModel.aggregate([
      {
        $match: {
          $expr: isChallengeOption,
        },
      },
      {
        $lookup: {
          from: QuestionSchemaClass.actualCollectionName,
          // localField: '_id',
          // foreignField: 'categoryId',
          let: { categoryId: '$_id' },
          pipeline: [
            {
              $match: statusOption,
            },
          ],
          as: 'questions',
        },
      },
      {
        $unwind: '$questions',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$questions',
              {
                category: {
                  _id: '$_id',
                  name: '$name',
                  isChallenge: '$isChallenge',
                },
              },
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

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

  async findByIdAndUserSubmission(
    id: Question['id'],
    userId: User['id'],
  ): Promise<QuestionAndSubmission> {
    const questions = await this.questionModel
      .findById(id)
      .populate(
        [
          ...this.questionPopulateOption,
          QuestionSchemaClass.submissionsJoinField,
        ],
        {},
        SubmissionSchemaClass.name,
        { userId },
      );

    if (!questions) return null;
    const submissions = questions['submissions'];
    return QuestionMapper.toDomainWithSubmission(questions, submissions[0]);
  }

  async update<U extends Partial<Omit<Question, 'id'>>>(
    data: U,
    id: string,
  ): Promise<Question> {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );

    return QuestionMapper.toDomain(updatedQuestion);
  }

  // PRIVATE METHOD

  private filterOptions(options: CategoriesQueriesOption): {
    isChallengeOption: Record<string, unknown>;
    statusOption: Record<string, unknown>;
  } {
    const { isChallenge, status } = options;
    const statusOption: Record<string, any> = {
      $expr: { $eq: ['$categoryId', '$$categoryId'] },
    };

    if (status === DomainStatusEnums.ACTIVE) {
      statusOption.deletedAt = null;
    } else if (status === DomainStatusEnums.INACTIVE) {
      statusOption.deletedAt = { $ne: null };
    }

    const isChallengeOption: Record<string, any> = {};
    if (isChallenge) {
      isChallengeOption['$expr'] = {};
      switch (isChallenge) {
        case 'true':
          isChallengeOption['$expr']['$eq'] = ['$isChallenge', true];
          break;
        case 'false':
          isChallengeOption['$expr']['$eq'] = ['$isChallenge', false];
          break;
      }
    }
    return { isChallengeOption, statusOption };
  }
}
