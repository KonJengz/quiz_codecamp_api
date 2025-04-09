import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigEnum, AllConfigType } from './config/types/all-config.type';
import { corsOptions } from './config/cors/cors';
import { ClientConfig } from './config/types/client-config.type';
import { useContainer } from 'class-validator';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import globalPipeValidationOption from './utils/pipe-validation.option';
import { SwaggerModule } from '@nestjs/swagger';
import {
  ApiDocumentDescription,
  swaggerOptions,
} from './config/swaggers/swagger.options';
import { AppConfig } from './config/types/app-config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AllConfigType>);
  app.enableCors(
    corsOptions(
      configService.getOrThrow<ClientConfig>(`${AllConfigEnum.Client}.domain`, {
        infer: true,
      }),
    ),
  );

  // Set container to use class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Setting validation Pipe for class-validator
  app.useGlobalPipes(new ValidationPipe(globalPipeValidationOption));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Setting api-prefix to process.env.API_PREFIX
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
  );

  // Setting api versioning
  app.enableVersioning({ type: VersioningType.URI });

  // App Variable from environment file
  const appName = configService.getOrThrow<AppConfig>('app.name', {
    infer: true,
  });

  const PORT = configService.getOrThrow<AppConfig>('app.port', {
    infer: true,
  });

  const host = configService.getOrThrow<AppConfig>('app.host', {
    infer: true,
  });

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      swaggerOptions(
        appName,
        configService.getOrThrow<AppConfig>('app.apiVersion', { infer: true }),
        ApiDocumentDescription(appName),
      ),
    ),
  );

  await app.listen(PORT, () =>
    Logger.log(`Server is starting on ${host}:${PORT}`),
  );
}
bootstrap();
