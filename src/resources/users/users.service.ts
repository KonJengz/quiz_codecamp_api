import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user-abstract.repository';
import { Service } from 'src/common/base-class';
import { User } from './domain/user.domain';
import { NullAble } from 'src/common/types/types';
import { isString } from 'class-validator';
import { ErrorApiResponse } from 'src/core/error-response';

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

  public async getByUsername(
    username: User['username'],
  ): Promise<NullAble<User>> {
    if (!username || !isString(username))
      throw ErrorApiResponse.badRequest(
        `Username: ${username} is not valid for finding user`,
      );
    const isUserExist = await this.userRepository.findByUsername(username);

    if (!isUserExist)
      throw ErrorApiResponse.notFound(
        `Username: ${username} could not be found on this server.`,
      );
  }

  update(data: Partial<Omit<User, 'id'>>, id: string): Promise<User> {
    return Promise.resolve(this.mockUser);
  }
}
