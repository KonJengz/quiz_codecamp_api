import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { categoriesPath, ME } from 'src/common/path';
import { CategoriesService } from './categories.service';
import { Category, QuestionInCategoryList } from './domain/categories.domain';
import {
  CategoriesQueriesOption,
  GetCategoryByIdIncludeQuestionsAndMe,
  GetCategoryByIdIncludeQuestionsResponse,
  GetCategoryByIdResponse,
  GetManyCategoriesResponse,
  GetMyCategoriesResponse,
} from './dto/get.dto';
import { CreateCategoryDto, CreateCategoryResponse } from './dto/create.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  UpdateCategoryDto,
  UpdateCategoryResponse,
  UpdateCategoryStatusResponse,
} from './dto/update.dto';
import { openApiDocs } from 'src/docs/open-api.docs';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';
import { HttpRequestWithUser } from 'src/common/types/http.type';
import {
  DomainQueryEnums,
  DomainStatusEnums,
} from 'src/common/types/products-shared.type';
import { QueryEnum } from 'src/utils/decorators/param/QueryEnum.decorator';

@Controller({ version: '1', path: categoriesPath.base })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiQuery({
    name: categoriesPath.queries.isChallenge,
    required: false,
    type: Boolean,
    description:
      'Query to filter type of categories as a challenge and non-challenge. Provide true if desired response is challenge-categories. Otherwise for non-challenge.',
  })
  @ApiQuery({
    name: DomainQueryEnums.status,
    required: false,
    type: String,
    enum: DomainStatusEnums,
    description:
      'Query to filter status of categories. If not provided, the ACTIVE status will be default.',
  })
  @ApiOkResponse({ type: GetManyCategoriesResponse })
  @Get()
  async getMany(
    @Query(categoriesPath.queries.isChallenge)
    isChallenge: CategoriesQueriesOption['isChallenge'],
    @QueryEnum({ queryStr: DomainQueryEnums.status, entity: DomainStatusEnums })
    status: DomainStatusEnums,
  ): Promise<GetManyCategoriesResponse> {
    const categories = await this.categoriesService.getMany({
      status,
      isChallenge,
    });
    return GetManyCategoriesResponse.getSuccess<Category[]>(
      categoriesPath.base,
      categories,
    );
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: categoriesPath.queries.isChallenge,
    required: false,
    type: Boolean,
    description:
      'Query to filter type of categories as a challenge and non-challenge. Provide true if desired response is challenge-categories. Otherwise for non-challenge.',
  })
  @ApiOkResponse({ type: GetMyCategoriesResponse })
  @UseGuards(AccessTokenAuthGuard)
  @Get(categoriesPath.me)
  async getMe(
    @Req() req: HttpRequestWithUser,
    @Query(categoriesPath.queries.isChallenge)
    isChallenge: CategoriesQueriesOption['isChallenge'],
  ): Promise<GetMyCategoriesResponse> {
    const myCategories = await this.categoriesService.getMe(req.user.userId, {
      isChallenge,
    });
    return GetMyCategoriesResponse.getSuccess(categoriesPath.me, myCategories);
  }

  @ApiParam({ name: categoriesPath.paramId, required: true })
  @ApiOkResponse({ type: GetCategoryByIdResponse })
  @Get(`:${categoriesPath.paramId}`)
  async getById(
    @Param(categoriesPath.paramId) id: Category['id'],
  ): Promise<GetCategoryByIdResponse> {
    // This is definitely not the best way
    // to make sure that category is correct type --> Category<QuestionInCategoryList>
    // but to not fix a lot of code base
    // we make sure that this will be Category<QuestionInCategoryList>
    // by providing generic.
    const category =
      await this.categoriesService.getById<QuestionInCategoryList>(id, false);
    return GetCategoryByIdResponse.getSuccess(
      `${categoriesPath.base}/${id}`,
      category,
    );
  }

  @ApiParam({ name: categoriesPath.paramId, required: true })
  @ApiOkResponse({ type: GetCategoryByIdIncludeQuestionsResponse })
  @Get(categoriesPath.getByIdAndQuestions)
  async getByIdAndQuestions(
    @Param(categoriesPath.paramId) id: Category['id'],
  ): Promise<GetCategoryByIdIncludeQuestionsResponse> {
    // This is definitely not the best way
    // to make sure that category is correct type --> Category<QuestionInCategoryList>
    // but to not fix a lot of code base
    // we make sure that this will be Category<QuestionInCategoryList>
    const category =
      await this.categoriesService.getById<QuestionInCategoryList>(id, true);
    return GetCategoryByIdIncludeQuestionsResponse.getSuccess(
      `${categoriesPath.base}/${id}`,
      category,
    );
  }

  @ApiBearerAuth()
  @ApiParam({ name: categoriesPath.paramId })
  @ApiOkResponse({ type: GetCategoryByIdIncludeQuestionsAndMe })
  @UseGuards(AccessTokenAuthGuard)
  @Get(categoriesPath.getByIdAndQuestionsIncludeMe)
  async getByIdAndQuestionIncludeMe(
    @Param(categoriesPath.paramId) id: Category['id'],
    @Req() req: HttpRequestWithUser,
  ): Promise<GetCategoryByIdIncludeQuestionsAndMe> {
    const categoryAndMyQuestionList = await this.categoriesService.getByIdAndMe(
      id,
      req.user.userId,
    );

    return GetCategoryByIdIncludeQuestionsAndMe.getSuccess(
      `${categoriesPath.base}/${id}/${ME}`,
      categoryAndMyQuestionList,
    );
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ type: CreateCategoryResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() body: CreateCategoryDto,
  ): Promise<CreateCategoryResponse> {
    const createdCategory = await this.categoriesService.create(body);
    return CreateCategoryResponse.postSuccess<Category>(
      categoriesPath.base,
      createdCategory,
    );
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateCategoryDto })
  @ApiParam({
    type: String,
    name: categoriesPath.paramId,
    required: false,
    description: openApiDocs.updateUrlParameter.isNotRequire,
  })
  @ApiOkResponse({ type: UpdateCategoryResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Patch(`:${categoriesPath.paramId}`)
  async update(
    @Body() body: UpdateCategoryDto,
  ): Promise<UpdateCategoryResponse> {
    const updatedCategory = await this.categoriesService.update(body);
    return UpdateCategoryResponse.patchSuccess(
      `${categoriesPath.base}/${categoriesPath.paramId}`,
      updatedCategory,
    );
  }

  @ApiBearerAuth()
  @ApiParam({ name: categoriesPath.paramId, required: true })
  @ApiOkResponse({ type: UpdateCategoryStatusResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Patch(categoriesPath.updateStatus)
  async updateStatus(
    @Param(categoriesPath.paramId) id: Category['id'],
  ): Promise<UpdateCategoryStatusResponse> {
    const updatedCategory = await this.categoriesService.updateStatus(id);

    return UpdateCategoryStatusResponse.patchSuccess(
      `${categoriesPath.base}/${id}/status`,
      updatedCategory,
    );
  }
}
