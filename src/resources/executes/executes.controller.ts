import { Body, Controller, Post } from '@nestjs/common';
import { executesPath } from 'src/common/path';
import { ExecutesService } from './executes.service';
import { ExecuteDto } from './dto/execute.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller({ path: executesPath.base, version: '1' })
export class ExecutesController {
  constructor(private readonly executesService: ExecutesService) {}

  @ApiBody({ type: ExecuteDto })
  @Post()
  execute(@Body() body: ExecuteDto) {
    console.log(body);
    return this.executesService.execute(body.code);
  }
}
