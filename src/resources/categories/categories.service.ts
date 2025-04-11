import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CategoriesRepository } from './repository/categories-abstract.repository';
import { Service } from 'src/common/base-class';
import { Category, MyCategory } from './domain/categories.domain';
import { CreateCategoryDto } from './dto/create.dto';
import { ErrorApiResponse } from 'src/core/error-response';
import { isString } from 'class-validator';
import { UpdateCategoryDto } from './dto/update.dto';
import { User } from '../users/domain/user.domain';

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
    if (!process.env.NODE_ENV.includes('development')) {
      return;
    }

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

    if (isTheNameExist)
      throw ErrorApiResponse.conflictRequest(
        `The category name ${data.name} is already existed in this server. Please try again with the new name.`,
      );

    return this.categoriesRepository.create(data);
  }

  getById(id: Category['id']): Promise<Category> {
    if (!id || !isString(id)) throw ErrorApiResponse.badRequest('ID', id);
    return this.categoriesRepository.findById(id);
  }

  getMany(): Promise<Category[]> {
    return this.categoriesRepository.findMany();
  }

  getMe(userId: User['id']): Promise<MyCategory[]> {
    return this.categoriesRepository.findMyCategories(userId);
  }

  async update(data: UpdateCategoryDto): Promise<Category> {
    const { categoryId, ...rest } = data;

    const isCategoryExist =
      await this.categoriesRepository.findById(categoryId);

    if (!isCategoryExist) throw ErrorApiResponse.notFound('ID', categoryId);

    return this.categoriesRepository.update(rest, categoryId);
  }
}
