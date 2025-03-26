import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionSchema,
  QuestionSchemaClass,
} from './entities/questions.entity';
import { QuestionRepository } from './questions-abstract.repository';
import { QuestionDocumentRepository } from './questions.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuestionSchemaClass.name,
        schema: QuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: QuestionRepository,
      useClass: QuestionDocumentRepository,
    },
  ],
})
export class QuestionsRepositoryModule {}
