import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  CategorySchema,
  CategorySchemaClass,
} from 'src/resources/categories/repository/entities/category.entity';
import { SubmissionSchemaClass } from 'src/resources/submissions/repository/entities/submissions.entity';
import { TestCaseSchema } from 'src/resources/test-cases/repository/entities/test-cases.entities';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export const SUBMISSIONS_JOIN_CONST = 'submissions';
export const CATEGORY_JOIN_CONST = 'category';

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
    type: [String],
    required: true,
  })
  input: string[];
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
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);

QuestionSchema.virtual(SUBMISSIONS_JOIN_CONST, {
  ref: SubmissionSchemaClass.name,
  localField: '_id',
  foreignField: 'questionId',
});

QuestionSchema.virtual(QuestionSchemaClass.categoryJoinField, {
  ref: CategorySchemaClass.name,
  localField: 'categoryId',
  foreignField: '_id',
});

// QuestionSchema.post('save', async (document) => {
//   const categoryModel = mongoose.model(
//     `${CategorySchemaClass.name}`,
//     CategorySchema,
//   );
//   await categoryModel.findByIdAndUpdate(document.categoryId, {
//     $push: { questions: document._id },
//   });
// });
