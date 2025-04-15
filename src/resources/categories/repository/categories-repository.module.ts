import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesRepository } from './categories-abstract.repository';
import { CategoriesDocumentRepository } from './categories.repository';
import {
  CategorySchema,
  CategorySchemaClass,
} from './entities/category.entity';
import {
  QuestionSchema,
  QuestionSchemaClass,
} from 'src/resources/questions/repository/entities/questions.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategorySchemaClass.name,
        schema: CategorySchema,
      },
      {
        name: QuestionSchemaClass.name,
        schema: QuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: CategoriesRepository,
      useClass: CategoriesDocumentRepository,
    },
  ],
  exports: [CategoriesRepository],
})
export class CategoriesRepositoryModule {}
