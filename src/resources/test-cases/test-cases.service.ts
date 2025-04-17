import { Injectable } from '@nestjs/common';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';

@Injectable()
export class TestCasesService {
  public getMatchers(): TestCaseMatcherEnum[] {
    const matchers: TestCaseMatcherEnum[] = [];

    for (let enumName in TestCaseMatcherEnum) {
      const val = TestCaseMatcherEnum[enumName] as TestCaseMatcherEnum;
      if (val.includes(' ') || val === TestCaseMatcherEnum.not) {
        continue;
      }

      matchers.push(val);
    }

    return matchers;
  }
}
