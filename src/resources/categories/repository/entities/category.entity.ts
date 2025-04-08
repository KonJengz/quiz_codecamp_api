import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
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
  questions: Types.ObjectId;

  @Prop({ type: Date, required: false, default: null })
  deletedAt?: Date;

  public static get questionsPopulatePath(): 'questions' {
    return 'questions';
  }
}

export const CategorySchema = SchemaFactory.createForClass(CategorySchemaClass);
