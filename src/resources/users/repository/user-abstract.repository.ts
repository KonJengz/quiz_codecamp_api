import { Repository } from 'src/infrastructure/persistence/config/repository';
import { User } from '../domain/user.domain';
import { NullAble } from 'src/common/types/types';

export abstract class UserRepository extends Repository<User> {
  abstract findByUsername(username: User['username']): Promise<NullAble<User>>;
}
