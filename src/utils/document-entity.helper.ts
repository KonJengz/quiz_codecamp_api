import { Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class EntityDocumentHelper extends Document {
  @Transform(
    (value) => {
      if ('value' in value) {
        return value.obj[value.key].toString();
      }
      return 'unknown value. id object does not contain value for id';
    },
    { toPlainOnly: true },
  )
  _id: string;
}
