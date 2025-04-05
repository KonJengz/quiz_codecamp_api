import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

export const TestCaseSchema = SchemaFactory.createForClass(TestCaseSchemaClass);
