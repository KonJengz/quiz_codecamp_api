import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './repository/categories-abstract.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
}
