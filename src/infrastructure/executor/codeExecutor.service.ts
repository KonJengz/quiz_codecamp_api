import { CodeExecutorService } from './codeExecutor-abstract.service';

export class IVMCodeExecutor implements CodeExecutorService {
  public execute(): string {
    return '';
  }
}
