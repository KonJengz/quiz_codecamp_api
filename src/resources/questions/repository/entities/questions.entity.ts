import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';
import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import { SubmissionSchemaClass } from 'src/resources/submissions/repository/entities/submissions.entity';
import {
  TestCaseSchema,
  TestCaseSchemaClass,
} from 'src/resources/test-cases/repository/entities/test-cases.entities';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export type QuestionDocument = HydratedDocument<QuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class QuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategorySchemaClass',
    required: true,
  })
  categoryId: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  title: string;

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
    type: String,
    required: true,
  })
  variableName: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  isFunction: boolean;

  @Prop({
    type: [TestCaseSchema],
    default: [],
  })
  testCases: TestCaseSchemaClass[];

  @Prop({ type: Date, required: false, default: null })
  deletedAt?: Date;

  public static get categoryJoinField(): 'category' {
    return 'category';
  }
  public static get testCaseJoinField(): 'testCases' {
    return 'testCases';
  }
  public static get submissionsJoinField(): 'submissions' {
    return 'submissions';
  }
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);

QuestionSchema.virtual(QuestionSchemaClass.submissionsJoinField, {
  ref: SubmissionSchemaClass.name,
  localField: '_id',
  foreignField: 'questionId',
});

QuestionSchema.virtual(QuestionSchemaClass.categoryJoinField, {
  ref: CategorySchemaClass.name,
  localField: 'categoryId',
  foreignField: '_id',
});
