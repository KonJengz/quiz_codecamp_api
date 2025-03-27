import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './repository/categories-abstract.repository';
import { Service } from 'src/common/base-class';
import { Category } from './domain/categories.domain';
import { CreateCategoryDto } from './dto/create.dto';
import { ErrorApiResponse } from 'src/core/error-response';
import { Promisable } from 'src/common/types/types';
import { isString, isUUID } from 'class-validator';

@Injectable()
export class CategoriesService extends Service<Category> {
  constructor(private readonly categoriesRepository: CategoriesRepository) {
    super();
  }

  create(data: CreateCategoryDto): Promise<Category> {
    const isTheNameExist = this.categoriesRepository.findByName(data.name);

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

  update(data: Partial<Omit<Category, 'id'>>, id: string): Category {}
}
