import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepositoryModule } from './repository/user-repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
