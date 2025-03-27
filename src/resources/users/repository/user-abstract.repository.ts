import { Repository } from 'src/infrastructure/persistence/config/repository';
import { User } from '../domain/user.domain';

export abstract class UserRepository extends Repository<User> {}
