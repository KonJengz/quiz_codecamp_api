import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DefaultSchemaOptions,
  Document,
  FlatRecord,
  HydratedDocument,
  Model,
  now,
} from 'mongoose';
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
    unique: true,
  })
  password: string;

  @Prop({
    default: now,
  })
  createdAt: Date;

  @Prop({
    default: now,
  })
  updatedAt: Date;

  @Prop({
    required: false,
  })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
