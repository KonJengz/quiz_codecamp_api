import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity.helper';

@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class TestCaseSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: [SchemaTypes.Mixed],
    required: true,
  })
  input: any[];
  @Prop({
    type: SchemaTypes.Mixed,
    required: true,
  })
  output: any;
  @Prop({
    required: false,
  })
  deletedAt?: Date;
}

export const TestCaseSchema = SchemaFactory.createForClass(TestCaseSchemaClass);
