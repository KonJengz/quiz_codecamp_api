import { ApiProperty } from '@nestjs/swagger';
import { BaseDomain } from 'src/common/base-domain';

type TestCaseConstructorInput = TestCase;

export class TestCase extends BaseDomain {
  @ApiProperty({ type: String })
  input: string;
  @ApiProperty({ type: String })
  output: string;

  constructor(data: TestCaseConstructorInput) {
    const { id, createdAt, updatedAt, deletedAt, input, output } = data;
    super({ createdAt, id, updatedAt, deletedAt });

    this.input = input;
    this.output = output;
  }
}
