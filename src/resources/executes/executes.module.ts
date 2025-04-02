import { Module } from '@nestjs/common';
import { ExecutesController } from './executes.controller';
import { ExecutesService } from './executes.service';
import { CodeExecutorModule } from 'src/infrastructure/executor/codeExecutor.module';

@Module({
  imports: [CodeExecutorModule],
  controllers: [ExecutesController],
  providers: [ExecutesService],
})
export class ExecutesModule {}
