import { AppConfig } from './app-config.type';
import { AuthConfig } from './auth-config.type';
import { ClientConfig } from './client-config.type';
import { MongoDBConfigType } from './database/mongodb-config.type';

export enum AllConfigEnum {
  App = 'app',
  Auth = 'auth',
  Client = 'client',
  MongoDB = 'mongodb',
}

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  client: ClientConfig;
  mongoDb: MongoDBConfigType;
};
