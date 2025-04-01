import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { submissionsPath } from 'src/common/path';
import { SubmissionsService } from './submissions.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import {
  CreateSubmissionDto,
  CreateSubmissionResponse,
} from './dto/create.dto';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { HttpRequestWithUser } from 'src/common/types/http.type';

@Controller({ path: submissionsPath.base, version: '1' })
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateSubmissionDto })
  @ApiCreatedResponse({ type: CreateSubmissionResponse })
  @UseGuards(AccessTokenAuthGuard)
  @Post()
  async submit(
    @Body() body: CreateSubmissionDto,
    @Req() req: HttpRequestWithUser,
  ): Promise<CreateSubmissionResponse> {
    const createdSubmission = await this.submissionsService.create({
      ...body,
      userId: req.user.userId,
    });

    return CreateSubmissionResponse.postSuccess(
      submissionsPath.base,
      createdSubmission,
    );
  }
}
