import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionsRepositoryModule } from './repository/questions-repository.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [QuestionsRepositoryModule, CategoriesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
