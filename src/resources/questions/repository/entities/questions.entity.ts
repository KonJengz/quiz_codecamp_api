import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
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
export class TestCaseSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    required: true,
  })
  input: string;
  @Prop({
    type: String,
    required: true,
  })
  code: string;
  @Prop({
    type: String,
    required: true,
  })
  output: string;
  @Prop({
    required: false,
  })
  deletedAt?: Date;
}

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
    required: true,
  })
  categoryId: CategorySchemaClass;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  starterCode: string;

  @Prop({
    type: String,
    required: true,
  })
  solution: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'TestCaseSchemaClass' },
    ],
    default: [],
  })
  testCases: TestCaseSchemaClass[];

  @Prop({ required: false })
  deletedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);
