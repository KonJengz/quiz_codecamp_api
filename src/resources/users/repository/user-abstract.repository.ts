import { Repository } from 'src/infrastructure/persistence/config/repository';
import { User } from '../domain/user.domain';
import { NullAble } from 'src/common/types/types';
import { CreateUserDto } from '../dto/create.dto';

export abstract class UserRepository extends Repository<User> {
  abstract findByUsername(username: User['username']): Promise<NullAble<User>>;

  abstract updateSolvedRecord(
    isChallenge: boolean,
    id: User['id'],
  ): Promise<User>;

  abstract count(): Promise<number>;

  abstract seeds(users: CreateUserDto[]): Promise<unknown>;

  abstract deleteAll(): Promise<void>;
}
