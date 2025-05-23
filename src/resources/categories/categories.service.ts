import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CategoriesRepository } from './repository/categories-abstract.repository';
import { Service } from 'src/common/base-class';
import {
  Category,
  MyCategory,
  QuestionAndSolveStatus,
  QuestionInCategoryList,
} from './domain/categories.domain';
import { CreateCategoryDto } from './dto/create.dto';
import { ErrorApiResponse } from 'src/core/error-response';
import { isString } from 'class-validator';
import { UpdateCategoryDto } from './dto/update.dto';
import { User } from '../users/domain/user.domain';
import { CategoriesQueriesOption } from './dto/get.dto';
import { Question } from '../questions/domain/question.domain';
import { IDValidator } from 'src/utils/IDValidatior';
import { NullAble } from 'src/common/types/types';

@Injectable()
export class CategoriesService
  extends Service<Category>
  implements OnModuleInit
{
  private logger: Logger = new Logger(CategoriesService.name);
  constructor(private readonly categoriesRepository: CategoriesRepository) {
    super();
  }

  async onModuleInit() {
    // if (!process.env.NODE_ENV.includes('development')) {
    //   return;
    // }

    try {
      const count = await this.categoriesRepository.count();
      if (count > 2) {
        this.logger.log('Seeding skipped as there are categories data in db.');
        return;
      }

      if (count >= 1) {
        await this.categoriesRepository.deleteAll();
      }

      await this.categoriesRepository.seeds();
    } catch (err) {
      this.logger.error(err.message);
      console.log('There is an error while seeding.');
    }
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const isTheNameExist = await this.categoriesRepository.findByName(
      data.name,
    );

    if (isTheNameExist && isTheNameExist.isChallenge === data.isChallenge)
      throw ErrorApiResponse.conflictRequest(
        `The category name ${data.name} is already existed in this server. Please try again with the new name.`,
      );

    return this.categoriesRepository.create(data);
  }

  getById<T>(
    id: Category['id'],
    includeQuestions: boolean = false,
  ): Promise<Category<T>> {
    IDValidator(id, 'Category');
    return this.categoriesRepository.findById<T>(id, includeQuestions);
  }

  getMany(options: CategoriesQueriesOption = {}): Promise<Category[]> {
    return this.categoriesRepository.findMany(options);
  }

  getMe(
    userId: User['id'],
    options: CategoriesQueriesOption = {},
  ): Promise<MyCategory[]> {
    return this.categoriesRepository.findMyCategories(userId, options);
  }

  async getByIdAndMe(
    categoryId: Category['id'],
    userId: User['id'],
  ): Promise<Category<QuestionAndSolveStatus>> {
    IDValidator(categoryId, 'Category');
    return this.categoriesRepository.findByIdIncludeUserDetail(
      categoryId,
      userId,
    );
  }

  async update(data: UpdateCategoryDto): Promise<Category> {
    const { categoryId, ...rest } = data;

    const isCategoryExist = await this.categoriesRepository.findById(
      categoryId,
      false,
    );

    if (!isCategoryExist) throw ErrorApiResponse.notFound('ID', categoryId);

    return this.categoriesRepository.update(rest, categoryId);
  }

  async updateStatus(id: Category['id']): Promise<Category> {
    IDValidator(id, 'Category');

    const category = await this.categoriesRepository.findById(id, false);

    if (!category) throw ErrorApiResponse.notFound('ID', id, 'Category');

    const data: { deletedAt: NullAble<Date> } = { deletedAt: null };

    if (!category.deletedAt) data.deletedAt = new Date(Date.now());

    return this.categoriesRepository.update(data, id);
  }
}
