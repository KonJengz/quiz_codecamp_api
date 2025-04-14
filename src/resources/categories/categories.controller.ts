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
import { categoriesPath } from 'src/common/path';
import { CategoriesService } from './categories.service';
import { Category } from './domain/categories.domain';
import {
  CategoriesQueriesOption,
  GetByIdCategoriesResponse,
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
import { UpdateCategoryDto, UpdateCategoryResponse } from './dto/update.dto';
import { openApiDocs } from 'src/docs/open-api.docs';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';
import { HttpRequestWithUser } from 'src/common/types/http.type';

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
  @ApiOkResponse({ type: GetManyCategoriesResponse })
  @Get()
  async getMany(
    @Query(categoriesPath.queries.isChallenge)
    isChallenge: CategoriesQueriesOption['isChallenge'],
  ): Promise<GetManyCategoriesResponse> {
    const categories = await this.categoriesService.getMany({ isChallenge });
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
  @ApiOkResponse({ type: GetByIdCategoriesResponse })
  @Get(`:${categoriesPath.paramId}`)
  async getById(
    @Param(categoriesPath.paramId) id: Category['id'],
  ): Promise<GetByIdCategoriesResponse> {
    const category = await this.categoriesService.getById(id);
    return GetByIdCategoriesResponse.getSuccess(
      `${categoriesPath.base}/${id}`,
      category,
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
}
