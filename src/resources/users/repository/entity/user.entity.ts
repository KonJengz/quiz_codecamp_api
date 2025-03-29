import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export type UserSchemaDocumennt = HydratedDocument<UserSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    type: Number,
    default: 0,
  })
  totalSolvedQuizzes?: number;

  @Prop({
    type: Number,
    default: 0,
  })
  totalSolvedChallenges?: number;

  @Prop({
    required: false,
  })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
