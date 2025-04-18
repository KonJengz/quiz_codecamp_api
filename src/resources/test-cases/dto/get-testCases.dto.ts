import { ApiProperty } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/core/api-response';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';

export class GetTestCaseMatchersResponse extends CoreApiResponse<
  TestCaseMatcherEnum[]
> {
  @ApiProperty({
    type: [String],
    example: ['toBe', 'toBeDeepEqual', 'toHaveType'],
    enum: TestCaseMatcherEnum,
  })
  data: TestCaseMatcherEnum[];
}
