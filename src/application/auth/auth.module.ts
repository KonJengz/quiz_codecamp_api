import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { UsersModule } from 'src/resources/users/users.module';

@Module({
  imports: [UsersModule, ConfigModule.forFeature(authConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
