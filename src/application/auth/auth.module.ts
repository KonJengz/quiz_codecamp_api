import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
