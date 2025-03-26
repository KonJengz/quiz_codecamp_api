import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export type CategorySchemaDocument = HydratedDocument<CategorySchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class CategorySchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: Boolean,
  })
  isChallenged: boolean;

  @Prop({
    default: now,
  })
  createdAt: Date;

  @Prop({
    default: now,
  })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(CategorySchemaClass);
