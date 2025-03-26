import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesRepository } from './categories-abstract.repository';
import { CategoriesDocumentRepository } from './categories.repository';
import {
  CategorySchema,
  CategorySchemaClass,
} from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategorySchemaClass.name,
        schema: CategorySchema,
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
