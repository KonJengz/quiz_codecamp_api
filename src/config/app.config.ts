import { registerAs } from '@nestjs/config';
import { IsInt, IsString } from 'class-validator';
import { AllConfigEnum } from './types/all-config.type';
import validateConfig from 'src/utils/validateConfig';
import { AppConfig } from './types/app-config.type';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariableValidator {
  @IsInt()
  APP_PORT: number;

  @IsString()
  API_PREFIX: string;

  @IsString()
  API_VERSION: string;
}

export default registerAs<AppConfig>(AllConfigEnum.App, () => {
  validateConfig(process.env, EnvironmentVariableValidator);

  return {
    nodeEnv: process.env.NODE_ENV || Environment.Development,
    host: process.env.SERVER_HOST || 'localhost',
    name: process.env.APP_NAME || 'quiz_code_camp',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000,
    apiPrefix: process.env.API_PREFIX || 'api',
    apiVersion: process.env.API_VERSION || 'v1',
  };
});
