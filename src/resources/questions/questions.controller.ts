import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { categoriesPath, questionsPath, userPath } from 'src/common/path';
import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  CreateQuestionResponse,
} from './dto/create-question.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';
import { ErrorApiResponse } from 'src/core/error-response';
import {
  GetManyQuestionsResponse,
  GetQuestionByIdResponse,
  GetQuestionsByCategoryIdResponse,
} from './dto/get-questions.dto';
import { Category } from '../categories/domain/categories.domain';
import { Question } from './domain/question.domain';

@Controller({ version: '1', path: questionsPath.base })
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
    if (!createdQuestion) throw ErrorApiResponse.internalServerError();
    return CreateQuestionResponse.postSuccess(
      questionsPath.base,
      createdQuestion,
    );
  }

  @ApiOkResponse({ type: GetManyQuestionsResponse })
  @Get()
  async getMany(): Promise<GetManyQuestionsResponse> {
    const questions = await this.questionsService.getMany();

    return GetManyQuestionsResponse.getSuccess(questionsPath.base, questions);
  }

  @ApiParam({ name: questionsPath.paramId, required: true })
  @ApiOkResponse({ type: GetQuestionByIdResponse })
  @Get(questionsPath.getById)
  async getById(
    @Param(questionsPath.paramId) id: Question['id'],
  ): Promise<GetQuestionByIdResponse> {
    const question = await this.questionsService.getById(id);

    return GetQuestionByIdResponse.getSuccess(
      `${questionsPath.base}/${id}`,
      question,
    );
  }

  @ApiParam({ name: questionsPath.categoryParam, required: true })
  @ApiOkResponse({ type: GetQuestionsByCategoryIdResponse })
  @Get(questionsPath.category)
  async getByCategoryId(
    @Param(questionsPath.categoryParam) categoryId: Category['id'],
  ): Promise<GetQuestionsByCategoryIdResponse> {
    const questions = await this.questionsService.getByCategoryId(categoryId);

    return GetQuestionsByCategoryIdResponse.getSuccess(
      `${categoriesPath.base}/${categoryId}`,
      questions,
    );
  }
}
