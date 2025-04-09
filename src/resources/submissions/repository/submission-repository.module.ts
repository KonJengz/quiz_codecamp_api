import { Module } from '@nestjs/common';
import { SubmissionRepository } from './submissions-abstract.repository';
import { SubmissionDocumentRepository } from './submission.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubmissionSchema,
  SubmissionSchemaClass,
} from './entities/submissions.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubmissionSchemaClass.name,
        schema: SubmissionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: SubmissionRepository,
      useClass: SubmissionDocumentRepository,
    },
  ],
  exports: [SubmissionRepository],
})
export class SubmissionRepositoryModule {}
