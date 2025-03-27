import { join } from 'path';
import { Logger, Module } from '@nestjs/common';
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
import { SubmitModule } from './resources/submit/submit.module';
import { UsersModule } from './resources/users/users.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { HealthcheckController } from './healthcheck/healthcheck.controller';

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
    infraStructureDatabaseModule,
    QuestionsModule,
    SubmitModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [HealthcheckController],
})
export class AppModule {}
