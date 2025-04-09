import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionSchema,
  QuestionSchemaClass,
} from './entities/questions.entity';
import { QuestionRepository } from './questions-abstract.repository';
import { QuestionDocumentRepository } from './questions.repository';
import {
  CategorySchema,
  CategorySchemaClass,
} from 'src/resources/categories/repository/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuestionSchemaClass.name,
        schema: QuestionSchema,
      },
      {
        name: CategorySchemaClass.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [
    {
      provide: QuestionRepository,
      useClass: QuestionDocumentRepository,
    },
  ],
  exports: [QuestionRepository],
})
export class QuestionsRepositoryModule {}
