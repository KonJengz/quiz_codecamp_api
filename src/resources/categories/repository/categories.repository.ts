import mongoose, { Model, Types } from 'mongoose';
import { Category, MyCategory } from '../domain/categories.domain';
import { CategoriesRepository } from './categories-abstract.repository';
import { CategorySchemaClass } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CategoryMapper } from './mapper/category.mapper';
import { User } from 'src/resources/users/domain/user.domain';
import { SubmissionStatusEnum } from 'src/resources/submissions/domain/submission.domain';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';
import { SubmissionSchemaClass } from 'src/resources/submissions/repository/entities/submissions.entity';
import {
  filterQuestionForCategory,
  seedsCategory,
  seedsQuestion,
} from 'src/utils/seeds/data/questions-related-data.seed';
import { CategoriesQueriesOption } from '../dto/get.dto';

export type MyCategoryQueried = CategorySchemaClass & {
  solvedQuestions: Types.ObjectId[];
};

@Injectable()
export class CategoriesDocumentRepository implements CategoriesRepository {
  private logger: Logger = new Logger(CategoriesDocumentRepository.name);
  constructor(
    @InjectModel(CategorySchemaClass.name)
    private readonly categoryModel: Model<CategorySchemaClass>,
    @InjectModel(QuestionSchemaClass.name)
    private readonly questionModel: Model<QuestionSchemaClass>,
  ) {}

  async count(): Promise<number> {
    return this.categoryModel.countDocuments();
  }

  async seeds(): Promise<unknown> {
    this.logger.log('Start seeding...');
    // Create category
    const createdCatego = await this.categoryModel.create(seedsCategory());
    // Create question
    const createdQuestions = await this.questionModel.create(
      seedsQuestion(createdCatego),
    );

    const categoAndQuestionMap = filterQuestionForCategory(
      createdCatego,
      createdQuestions,
    );

    categoAndQuestionMap.forEach(async (questions, categoryId) => {
      await this.categoryModel.findByIdAndUpdate(categoryId, { questions });
    });

    this.logger.log('Seeding categories and questions finished!');
    return;
  }

  async create<U extends Partial<Category>>(data: U): Promise<Category> {
    const createdCategory = new this.categoryModel(data);
    const categoryObj = await createdCategory.save();

    return CategoryMapper.toDomain(categoryObj);
  }

  async findById(id: Category['id']): Promise<Category> {
    const categoryObj = await this.categoryModel.findById(id);

    return CategoryMapper.toDomain(categoryObj);
  }

  async findByName(name: Category['name']): Promise<Category> {
    const categoryObj = await this.categoryModel.findOne({
      name,
    });

    return CategoryMapper.toDomain(categoryObj);
  }

  async findMany(options: CategoriesQueriesOption): Promise<Category[]> {
    const filter = this.filterOptions(options);

    const categoryObj = await this.categoryModel.find(filter);
    // .populate(CategorySchemaClass.questionsPopulatePath);
    return categoryObj.map(CategoryMapper.toDomain);
  }

  /**
   *
   * Function for finding all of the categories
   * but also provided the total solved question
   * for the requested user.
   * @param {User["id"]} userId
   * @returns {MyCategory[]}
   */
  async findMyCategories(
    userId: User['id'],
    options: CategoriesQueriesOption,
  ): Promise<MyCategory[]> {
    const filter = this.filterOptions(options);
    const myCategories: MyCategoryQueried[] =
      await this.categoryModel.aggregate([
        {
          $match: filter,
        },
        // Lookup questions for each category
        {
          $lookup: {
            from: QuestionSchemaClass.actualCollectionName,
            localField: '_id',
            foreignField: 'categoryId',
            as: 'questions',
          },
        },
        // Unwind each question to operate on each individually
        {
          $unwind: {
            path: '$questions',
            preserveNullAndEmptyArrays: true,
          },
        },
        // Lookup submissions from each question (using corrected field reference)
        {
          $lookup: {
            from: SubmissionSchemaClass.actualCollectionName,
            let: { questionId: '$questions._id' },
            pipeline: [
              {
                // Match the questionId, userId and PASSED status
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$questionId', '$$questionId'] },
                      { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] },
                      { $eq: ['$status', SubmissionStatusEnum.PASSED] },
                    ],
                  },
                },
              },
              // Only grab the id of document
              { $project: { _id: 1 } },
            ],
            as: 'submissions',
          },
        },
        // Group back the questions by category to reassemble the data structure
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            isChallenge: { $first: '$isChallenge' },
            deletedAt: { $first: '$deletedAt' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
            __v: { $first: '$__v' },
            // Collect only the question ID
            questions: {
              $push: '$questions._id',
            },
            // Count only those questions with at least one matching submission
            solvedQuestions: {
              $push: {
                $cond: [
                  {
                    $gt: [{ $size: '$submissions' }, 0],
                  },
                  '$questions._id',
                  '$$REMOVE',
                ],
              },
            },
          },
        },
      ]);

    return myCategories.map(CategoryMapper.toMyCategoryDomain);
  }

  async update<U extends Partial<Omit<Category, 'id'>>>(
    data: U,
    id: Category['id'],
  ): Promise<Category> {
    const categoryObj = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true },
    );

    return CategoryMapper.toDomain(categoryObj);
  }

  async deleteAll(): Promise<void> {
    await this.categoryModel.deleteMany();
    return;
  }

  private filterOptions(
    options: CategoriesQueriesOption,
  ): mongoose.RootFilterQuery<CategorySchemaClass> {
    const { isChallenge } = options;
    const filter: mongoose.RootFilterQuery<CategorySchemaClass> = {};

    if (!isChallenge) return filter;
    switch (isChallenge) {
      case 'true':
        filter.isChallenge = true;
        break;
      case 'false':
        filter.isChallenge = false;
        break;
    }

    return filter;
  }
}
