import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';
import { SubmissionStatusEnum } from '../../domain/submission.domain';

export type SubmissionDocument = HydratedDocument<SubmissionSchemaClass>;

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
export class SubmissionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionSchemaClass',
    required: true,
  })
  questionId: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchemaClass',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({
    enum: SubmissionStatusEnum,
    required: true,
  })
  status: SubmissionStatusEnum;
}

export const SubmissionSchema = SchemaFactory.createForClass(
  SubmissionSchemaClass,
);
