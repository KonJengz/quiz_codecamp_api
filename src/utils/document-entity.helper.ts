import { Transform } from 'class-transformer';

export class EntityDocumentHelper {
  @Transform(
    (value) => {
      if ('value' in value) {
        return value.obj[value.key].toString();
      }
      return 'unknown value. id object does not contain value for id';
    },
    { toPlainOnly: true },
  )
  public _id: string;
}
