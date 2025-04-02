import { Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

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

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, required: false })
  deletedAt?: Date;
<<<<<<< HEAD

  softDelete(): void {
    this.deletedAt = new Date(Date.now());
    return;
  }
=======
>>>>>>> origin/main
}
