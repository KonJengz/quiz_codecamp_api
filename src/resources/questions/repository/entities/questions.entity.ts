import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export type QuestionDocument = HydratedDocument<QuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class QuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategorySchemaClass',
  })
  category: CategorySchemaClass;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  starterCode: string;

  @Prop({
    type: String,
  })
  solution: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);
