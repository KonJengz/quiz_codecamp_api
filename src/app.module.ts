import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerOptions } from './config/throttler/throttler.options';
import clientConfig from './config/client.config';
import {
  infraStructureDatabaseConfig,
  infraStructureDatabaseModule,
} from './infrastructure/persistence/config/infrastructure.config';
import { QuestionsModule } from './resources/questions/questions.module';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { CustomValidatorModule } from './utils/validators/custom-validator.module';
import { AuthController } from './application/auth/auth.controller';
import { AuthService } from './application/auth/auth.service';
import { AuthModule } from './application/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SubmissionsModule } from './resources/submissions/submissions.module';

const env = process.env.NODE_ENV || '';
const envPath = join(process.cwd(), `.env.${env}`);
console.log('Loading env file from:', envPath);

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: throttlerOptions,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${env}`,
      load: [appConfig, clientConfig, infraStructureDatabaseConfig],
    }),
    JwtModule.register({ global: true }),
    infraStructureDatabaseModule,
    QuestionsModule,
    SubmissionsModule,
    UsersModule,
    CategoriesModule,
    CustomValidatorModule,
    AuthModule,
  ],
  controllers: [HealthcheckController, AuthController],
  providers: [AuthService],
})
export class AppModule {}
