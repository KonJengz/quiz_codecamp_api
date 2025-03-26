import { Controller, Get } from '@nestjs/common';
import { categoriesPath } from 'src/common/path';
import { CategoriesService } from './categories.service';
import { Category } from './domain/categories.domain';

@Controller({ version: '1', path: categoriesPath.base })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getMany(): Promise<Category[]> {}
}
