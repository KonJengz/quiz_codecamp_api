import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepositoryModule } from './repository/user-repository.module';
import { AuthModule } from 'src/application/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
