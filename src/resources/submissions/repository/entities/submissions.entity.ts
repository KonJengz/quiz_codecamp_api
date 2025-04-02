import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';
import { UserSchemaClass } from 'src/resources/users/repository/entity/user.entity';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

export enum SubmissionStatusEnum {
  Accepted = 'ACCEPTED',
  UnAccepted = 'UNACCEPTED',
}

export type SubmissionDocument = HydratedDocument<SubmissionSchemaClass>;

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
    default: SubmissionStatusEnum.UnAccepted,
  })
  status: SubmissionStatusEnum;
}

export const SubmissionSchema = SchemaFactory.createForClass(
  SubmissionSchemaClass,
);
