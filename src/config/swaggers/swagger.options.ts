import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const swaggerOptions = (
  title: string,
  version: string,
  description: string,
): Omit<OpenAPIObject, 'paths'> =>
  new DocumentBuilder()
    .setTitle(title)
    .setVersion(version)
    .setDescription(description)
    .addBearerAuth()
    .build();

export const ApiDocumentDescription = (appName: string): string =>
  `This is the document for ${appName} `;
