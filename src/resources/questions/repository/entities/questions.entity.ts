<<<<<<< HEAD
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { SubmissionSchemaClass } from 'src/resources/submissions/repository/entities/submissions.entity';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export const SUBMISSIONS_JOIN_CONST = 'submissions';

=======
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

>>>>>>> origin/main
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
<<<<<<< HEAD
  toObject: {
    virtuals: true,
  },
=======
>>>>>>> origin/main
})
export class QuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategorySchemaClass',
    required: true,
  })
<<<<<<< HEAD
  categoryId: Types.ObjectId;
=======
  categoryId: CategorySchemaClass;
>>>>>>> origin/main

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

<<<<<<< HEAD
  @Prop({
    type: String,
    required: true,
  })
=======
>>>>>>> origin/main
  variableName: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'TestCaseSchemaClass' },
    ],
    default: [],
  })
<<<<<<< HEAD
  testCases: Types.ObjectId[];
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);

QuestionSchema.virtual(SUBMISSIONS_JOIN_CONST, {
  ref: SubmissionSchemaClass.name,
  localField: '_id',
  foreignField: 'questionId',
});
=======
  testCases: TestCaseSchemaClass[];

  @Prop({ required: false })
  deletedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);
>>>>>>> origin/main
