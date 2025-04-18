import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';
import { testCasesPath } from 'src/common/path';
import { GetTestCaseMatchersResponse } from './dto/get-testCases.dto';
import { TestCasesService } from './test-cases.service';

@Controller({ path: testCasesPath.base, version: '1' })
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: GetTestCaseMatchersResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Get(testCasesPath.matchers)
  getMatchers(): GetTestCaseMatchersResponse {
    const matchers = this.testCasesService.getMatchers();

    return GetTestCaseMatchersResponse.getSuccess(
      `${testCasesPath.base}/${testCasesPath.matchers}`,
      matchers,
    );
  }
}
