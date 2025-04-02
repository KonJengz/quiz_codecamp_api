import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepositoryModule } from './repository/categories-repository.module';
<<<<<<< HEAD
import { AuthModule } from 'src/application/auth/auth.module';

@Module({
  imports: [AuthModule, CategoriesRepositoryModule],
=======

@Module({
  imports: [CategoriesRepositoryModule],
>>>>>>> origin/main
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
