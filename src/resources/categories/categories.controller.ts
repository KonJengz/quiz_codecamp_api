import { Controller, Get, Post } from '@nestjs/common';
import { categoriesPath } from 'src/common/path';
import { CategoriesService } from './categories.service';
import { Category } from './domain/categories.domain';
import { CoreApiResponse } from 'src/core/api-response';
import { GetManyCategoriesResponse } from './dto/get.dto';
import { CreateCategoryResponse } from './dto/create.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller({ version: '1', path: categoriesPath.base })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getMany(): GetManyCategoriesResponse {
    const categories = [new Category({ id: '', name: '', isChallenge: false })];
    return GetManyCategoriesResponse.getSuccess<Category[]>(
      categoriesPath.base,
      categories,
    );
  }

  @ApiBearerAuth()
  @ApiCreatedResponse()
  @Post()
  create(): CreateCategoryResponse {
    const categories = new Category({ id: '', name: '', isChallenge: false });
    return CreateCategoryResponse.postSuccess<Category>(
      categoriesPath.base,
      categories,
    );
  }
}
