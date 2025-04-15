import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { CodeExecutorModule } from 'src/infrastructure/executor/codeExecutor.module';
import { AuthModule } from 'src/application/auth/auth.module';
import { QuestionsModule } from '../questions/questions.module';
import { SubmissionRepositoryModule } from './repository/submission-repository.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CodeExecutorModule,
    QuestionsModule,
    SubmissionRepositoryModule,
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
