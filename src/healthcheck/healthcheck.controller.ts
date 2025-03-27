import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { healthCheckPath } from 'src/common/path';
import { CoreApiResponse } from 'src/core/api-response';

@Controller({ version: '1', path: healthCheckPath.base })
export class HealthcheckController {
  @ApiOkResponse({ type: CoreApiResponse<null> })
  @Get()
  healthCheck(): CoreApiResponse<null> {
    return CoreApiResponse.getSuccess<null>(healthCheckPath.base, null);
  }
}
