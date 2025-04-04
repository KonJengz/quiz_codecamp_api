import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { CodeExecutorModule } from 'src/infrastructure/executor/codeExecutor.module';
import { AuthModule } from 'src/application/auth/auth.module';

@Module({
  imports: [AuthModule, CodeExecutorModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
