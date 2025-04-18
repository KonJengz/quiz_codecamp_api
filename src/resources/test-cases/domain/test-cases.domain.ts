import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';

type TestCaseConstructorInput = TestCase;

export class TestCase extends BaseDomain {
  @ApiProperty({ nullable: true })
  input?: any[];
  @ApiProperty()
  expected: any;
  @ApiProperty({ enum: TestCaseMatcherEnum, type: String, nullable: true })
  matcher?: TestCaseMatcherEnum;
  @ApiProperty({ type: String, nullable: true })
  variable?: string;
  @ApiProperty({ type: Boolean, nullable: true })
  not?: boolean;

  constructor(data: TestCaseConstructorInput) {
    const {
      id,
      createdAt,
      updatedAt,
      deletedAt,
      input,
      expected,
      matcher,
      not,
      variable,
    } = data;
    super({ createdAt, id, updatedAt, deletedAt });

    this.input = input;
    this.expected = expected;
    this.matcher = matcher;
    this.not = not;
    if (variable) this.variable = variable;
  }
}
