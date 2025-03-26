import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AllConfigEnum, AllConfigType } from 'src/config/types/all-config.type';
import { MongoDBConfigType } from 'src/config/types/database/mongodb-config.type';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private uri: string;
  private dbName: string;
  private user: string;
  private pass: string;
  private readonly logger: Logger = new Logger(MongooseConfigService.name);

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

  createMongooseOptions(): MongooseModuleOptions {
    this.logger.log(`Connecting to URL: ${this.uri}`);
    this.logger.log(`Database Name: ${this.dbName}`);
    return {
      uri: this.uri,
      auth: {
        username: this.user,
        password: this.pass,
      },
      dbName: this.dbName,
      authSource: 'admin',
      retryWrites: true,
      w: 'majority',
    };
  }
}
