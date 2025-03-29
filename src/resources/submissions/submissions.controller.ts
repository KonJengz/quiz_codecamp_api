import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { submissionsPath } from 'src/common/path';
import { SubmissionsService } from './submissions.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateSubmissionsDto } from './dto/create.dto';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { HttpRequestWithUser } from 'src/common/types/http.type';

@Controller({ path: submissionsPath.base, version: '1' })
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenAuthGuard)
  @Post()
  submit(@Body() body: CreateSubmissionsDto, @Req() req: HttpRequestWithUser) {}
}
