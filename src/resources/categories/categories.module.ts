import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepositoryModule } from './repository/categories-repository.module';
import { AuthModule } from 'src/application/auth/auth.module';

@Module({
  imports: [AuthModule, CategoriesRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
