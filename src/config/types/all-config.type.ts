import { AppConfig } from './app-config.type';
import { ClientConfig } from './client-config.type';
import { MongoDBConfigType } from './database/mongodb-config.type';

export enum AllConfigEnum {
  App = 'app',
  Client = 'client',
  MongoDB = 'mongodb',
}

export type AllConfigType = {
  app: AppConfig;
  client: ClientConfig;
  mongoDb: MongoDBConfigType;
};
