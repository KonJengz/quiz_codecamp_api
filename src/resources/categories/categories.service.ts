import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './repository/categories-abstract.repository';
import { Service } from 'src/common/base-class';
<<<<<<< HEAD
import { Category, MyCategory } from './domain/categories.domain';
=======
import { Category } from './domain/categories.domain';
>>>>>>> origin/main
import { CreateCategoryDto } from './dto/create.dto';
import { ErrorApiResponse } from 'src/core/error-response';
import { isString } from 'class-validator';
import { UpdateCategoryDto } from './dto/update.dto';
<<<<<<< HEAD
import { User } from '../users/domain/user.domain';
=======
>>>>>>> origin/main

@Injectable()
export class CategoriesService extends Service<Category> {
  constructor(private readonly categoriesRepository: CategoriesRepository) {
    super();
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

<<<<<<< HEAD
  getMe(userId: User['id']): Promise<MyCategory[]> {
    return this.categoriesRepository.findMyCategories(userId);
  }

=======
>>>>>>> origin/main
  async update(data: UpdateCategoryDto): Promise<Category> {
    const { categoryId, ...rest } = data;

    const isCategoryExist =
      await this.categoriesRepository.findById(categoryId);

    if (!isCategoryExist) throw ErrorApiResponse.notFound('ID', categoryId);

    return this.categoriesRepository.update(rest, categoryId);
  }
}
