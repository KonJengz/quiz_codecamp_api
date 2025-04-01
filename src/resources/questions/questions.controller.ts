import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { questionsPath, userPath } from 'src/common/path';
import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  CreateQuestionResponse,
} from './dto/create-question.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';

@Controller({ version: 'v1', path: questionsPath.base })
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateQuestionDto })
  @ApiCreatedResponse({ type: CreateQuestionResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() body: CreateQuestionDto,
  ): Promise<CreateQuestionResponse> {
    const createdQuestion = await this.questionsService.create(body);

    return CreateQuestionResponse.postSuccess(
      questionsPath.base,
      createdQuestion,
    );
  }
}
