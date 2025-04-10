import mongoose, { Model } from 'mongoose';
import { Category, MyCategory } from '../domain/categories.domain';
import { CategoriesRepository } from './categories-abstract.repository';
import { CategorySchemaClass } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CategoryMapper } from './mapper/category.mapper';
import { User } from 'src/resources/users/domain/user.domain';
import { SubmissionStatusEnum } from 'src/resources/submissions/domain/submission.domain';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';

@Injectable()
export class CategoriesDocumentRepository implements CategoriesRepository {
  constructor(
    @InjectModel(CategorySchemaClass.name)
    private readonly categoryModel: Model<CategorySchemaClass>,
  ) {}

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

  async findMany(): Promise<Category[]> {
    const categoryObj = await this.categoryModel.find();
    // .populate(CategorySchemaClass.questionsPopulatePath);
    console.log(categoryObj);
    return categoryObj.map(CategoryMapper.toDomain);
  }

  async findMyCategories(userId: User['id']): Promise<MyCategory[]> {
    const myCategories = await this.categoryModel
      .find()
      .populate({
        path: 'questions',
        populate: {
          path: QuestionSchemaClass.submissionsJoinField,
          match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: SubmissionStatusEnum.PASSED,
          },
        },
      })
      .exec();
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
}
