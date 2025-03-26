import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { AllConfigEnum } from 'src/config/types/all-config.type';
import { MongoDBConfigType } from 'src/config/types/database/mongodb-config.type';
import validateConfig from 'src/utils/validateConfig';

class MongoDBVariableValidator {
  @IsString()
  DATABASE_URL: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
}

export default registerAs<MongoDBConfigType>(AllConfigEnum.MongoDB, () => {
  validateConfig(process.env, MongoDBVariableValidator);

  return {
    url: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  };
});
