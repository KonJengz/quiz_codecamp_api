import { User } from '../../domain/user.domain';
import { UserSchemaClass } from '../entity/user.entity';

export class UserMapper {
  public static toDomain(entity: UserSchemaClass): User {
    if (!entity) return null;

    const { _id, ...rest } = entity.toObject();
    return new User({ id: _id.toString(), ...rest });
  }
}
