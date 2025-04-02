import { Injectable } from '@nestjs/common';
import { CodeExecutorService } from 'src/infrastructure/executor/codeExecutor-abstract.service';

@Injectable()
export class ExecutesService {
  constructor(private readonly codeExecutorService: CodeExecutorService) {}

  execute(code: string) {
    return this.codeExecutorService.execute(code);
  }
}
