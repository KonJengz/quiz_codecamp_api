import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class TestCaseSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: [mongoose.Schema.Types.Mixed],
    required: true,
    default: [],
  })
  input: any[];
  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
  })
  expected: any;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    default: TestCaseMatcherEnum.toBe,
  })
  matcher: TestCaseMatcherEnum;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
  })
  variable?: string;
  @Prop({
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  })
  not: boolean;
  @Prop({
    required: false,
  })
  deletedAt?: Date;
}

export const TestCaseSchema = SchemaFactory.createForClass(TestCaseSchemaClass);
