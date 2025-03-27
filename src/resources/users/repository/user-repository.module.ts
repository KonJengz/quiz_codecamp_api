import { Module } from '@nestjs/common';
import { UserRepository } from './user-abstract.repository';
import { UserDocumentRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaClass } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchemaClass.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserDocumentRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
