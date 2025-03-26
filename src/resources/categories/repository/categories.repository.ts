import { Model } from 'mongoose';
import { Category } from '../domain/categories.domain';
import { CategoriesRepository } from './categories-abstract.repository';
import { CategorySchemaClass } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesDocumentRepository implements CategoriesRepository {
  constructor(
    @InjectModel(CategorySchemaClass.name)
    private readonly categoryModel: Model<CategorySchemaClass>,
  ) {}

  create<U extends Partial<Category>>(data: U): Category {
    return new Category({ id: '', name: '', isChallenge: false });
  }
  findById(id: string): Category {
    return new Category({ id: '', name: '', isChallenge: false });
  }
  findMany(): Category[] {
    return [new Category({ id: '', name: '', isChallenge: false })];
  }
  update<U extends Partial<Omit<Category, 'id'>>>(data: U): Category {
    return new Category({ id: '', name: '', isChallenge: false });
  }
}
