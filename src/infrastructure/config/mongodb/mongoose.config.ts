import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AllConfigEnum, AllConfigType } from 'src/config/types/all-config.type';
import { MongoDBConfigType } from 'src/config/types/database/mongodb-config.type';

export class MongooseConfigService implements MongooseOptionsFactory {
  private uri: string;
  private dbName: string;
  private user: string;
  private pass: string;

  constructor(
    @Inject(ConfigService) private configService: ConfigService<AllConfigType>,
  ) {
    this.uri = configService.getOrThrow<MongoDBConfigType>(
      `${AllConfigEnum.MongoDB}.url`,
      {
        infer: true,
      },
    );

    this.user = configService.getOrThrow<MongoDBConfigType>(
      `${AllConfigEnum.MongoDB}.username`,
      {
        infer: true,
      },
    );
    this.dbName = configService.getOrThrow<MongoDBConfigType>(
      `${AllConfigEnum.MongoDB}.dbName`,
      {
        infer: true,
      },
    );
    this.pass = configService.getOrThrow<MongoDBConfigType>(
      `${AllConfigEnum.MongoDB}.password`,
      {
        infer: true,
      },
    );
  }

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      uri: this.uri,
      dbName: this.dbName,
      user: this.user,
      pass: this.pass,
    };
  }
}
