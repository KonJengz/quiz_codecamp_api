import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-abstract.repository';
import { Service } from 'src/common/base-class';
import { User } from './domain/user.domain';

@Injectable()
export class UsersService extends Service<User> {
  private mockUser: User = new User({
    id: '',
    username: '',
    password: '',
    createdAt: '',
    deletedAt: null,
    updatedAt: '',
  });

  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  create(data: unknown): Promise<User> {
    return Promise.resolve(this.mockUser);
  }
  getById(id: string): Promise<User> {
    return Promise.resolve(this.mockUser);
  }
  getMany(): Promise<User[]> {
    return Promise.resolve([this.mockUser]);
  }
  update(data: Partial<Omit<User, 'id'>>, id: string): Promise<User> {
    return Promise.resolve(this.mockUser);
  }
}
