import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './repository/user-abstract.repository';
import { Service } from 'src/common/base-class';
import { User } from './domain/user.domain';
import { NullAble } from 'src/common/types/types';
import { isString } from 'class-validator';
import { ErrorApiResponse } from 'src/core/error-response';
import { CreateUserDto } from './dto/create.dto';
import { userSeedsData } from 'src/utils/seeds/data/user-data.seed';

@Injectable()
export class UsersService extends Service<User> implements OnModuleInit {
  private readonly logger: Logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onModuleInit() {
    try {
      const count = await this.userRepository.count();
      if (count > 2) {
        this.logger.log('Seeding skipped as there are users data in db.');
        return;
      }

      if (count >= 1) {
        await this.userRepository.deleteAll();
      }

      await this.userRepository.seeds(userSeedsData);
    } catch (err) {
      this.logger.error(err.message);
      console.log('There is an error while seeding.');
    }
  }

  async create(data: CreateUserDto): Promise<User> {
    const isUsernameExist = await this.getByUsername(data.username);

    if (isUsernameExist)
      throw ErrorApiResponse.conflictRequest(
        `The username: ${data.username} is already existed`,
      );

    return this.userRepository.create(data);
  }

  async getById(id: User['id']): Promise<User> {
    const isUserExist = await this.userRepository.findById(id);

    if (!isUserExist) throw ErrorApiResponse.notFound('ID', id);

    return isUserExist;
  }

  getMany(): Promise<User[]> {
    return this.userRepository.findMany();
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

    return isUserExist;
  }

  async update(data: Partial<Omit<User, 'id'>>, id: string): Promise<User> {
    const isUserExist = await this.getById(id);

    if (!isUserExist) throw ErrorApiResponse.notFound('ID', id);

    if (data.username) {
      const isUsernameExist = await this.getByUsername(data.username);
      if (isUsernameExist)
        throw ErrorApiResponse.conflictRequest(
          `The username ${data.username} is already existed.`,
        );
    }

    return this.userRepository.update(data, id);
  }

  async updateSolvedRecord(
    isChallenge: boolean,
    id: User['id'],
  ): Promise<User> {
    return this.userRepository.updateSolvedRecord(isChallenge, id);
  }
}
