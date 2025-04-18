import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { categoriesPath, questionsPath, userPath } from 'src/common/path';
import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  CreateQuestionResponse,
} from './dto/create-question.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';
import { ErrorApiResponse } from 'src/core/error-response';
import {
  GetManyQuestionsResponse,
  GetQuestionByIdAndMySubmissionReponse,
  GetQuestionByIdResponse,
} from './dto/get-questions.dto';
import { Question } from './domain/question.domain';
import { HttpRequestWithUser } from 'src/common/types/http.type';
import {
  UpdateQuestionDto,
  UpdateQuestionResponse,
  UpdateQuestionStatusResponse,
} from './dto/update-question.dto';
import {
  DomainQueryEnums,
  DomainStatusEnums,
} from 'src/common/types/products-shared.type';
import { QueryEnum } from 'src/utils/decorators/param/QueryEnum.decorator';

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

  @ApiQuery({
    name: DomainQueryEnums.status,
    enum: DomainStatusEnums,
    required: false,
    description: `Query for filter status of questions. If not provided, ${DomainStatusEnums.ACTIVE} will be default`,
  })
  @ApiOkResponse({ type: GetManyQuestionsResponse })
  @Get()
  async getMany(
    @QueryEnum({ entity: DomainStatusEnums, queryStr: DomainQueryEnums.status })
    status: DomainStatusEnums,
  ): Promise<GetManyQuestionsResponse> {
    const questions = await this.questionsService.getMany({ status });

    return GetManyQuestionsResponse.getSuccess(questionsPath.base, questions);
  }

  @ApiBearerAuth()
  @ApiParam({ name: questionsPath.paramId, required: true })
  @UseGuards(AccessTokenAuthGuard)
  @Get(questionsPath.idAndMe)
  async getByIdAndMe(
    @Param(questionsPath.paramId) id: Question['id'],
    @Req() req: HttpRequestWithUser,
  ): Promise<GetQuestionByIdAndMySubmissionReponse> {
    const questionAndMySubmission =
      await this.questionsService.getByIdAndMySubmission(id, req.user.userId);

    return GetQuestionByIdAndMySubmissionReponse.getSuccess(
      `${id}/${questionsPath.idAndMe.split('/').slice(0, 1)}`,
      questionAndMySubmission,
    );
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

  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdateQuestionResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Patch(`:${questionsPath.paramId}`)
  async update(
    @Body() body: UpdateQuestionDto,
  ): Promise<UpdateQuestionResponse> {
    const updatedQuestion = await this.questionsService.update(
      body,
      body.questionId,
    );

    return UpdateQuestionResponse.patchSuccess(
      `${questionsPath.base}/${body.questionId}`,
      updatedQuestion,
    );
  }

  @ApiBearerAuth()
  @ApiParam({ name: questionsPath.paramId, required: true })
  @ApiOkResponse({ type: UpdateQuestionStatusResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Patch(questionsPath.updateStatus)
  async updateStatus(
    @Param(questionsPath.paramId) id: Question['id'],
  ): Promise<UpdateQuestionStatusResponse> {
    const updatedQuestion = await this.questionsService.updateStatus(id);

    return UpdateQuestionStatusResponse.patchSuccess(
      `${questionsPath.base}/${id}/status`,
      updatedQuestion,
    );
  }
}
