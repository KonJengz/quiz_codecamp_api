import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';
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
    required: true,
    type: String,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  isChallenge: boolean;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionSchemaClass' },
    ],
    default: [],
  })
  questions: QuestionSchemaClass['id'][];

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

export const CategorySchema = SchemaFactory.createForClass(CategorySchemaClass);
