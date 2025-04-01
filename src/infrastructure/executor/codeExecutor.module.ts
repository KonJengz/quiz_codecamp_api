import { Module } from '@nestjs/common';
import { CodeExecutorService } from './codeExecutor-abstract.service';
import { IVMCodeExecutor } from './codeExecutor.service';

@Module({
  providers: [
    {
      provide: CodeExecutorService,
      useClass: IVMCodeExecutor,
    },
  ],
  exports: [CodeExecutorService],
})
export class CodeExecutorModule {}
