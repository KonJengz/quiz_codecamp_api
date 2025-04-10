import { Model, UpdateQuery } from 'mongoose';
import { User } from '../domain/user.domain';
import { UserRepository } from './user-abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaClass } from './entity/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { NullAble } from 'src/common/types/types';
import { CreateUserDto } from '../dto/create.dto';
import { Logger } from '@nestjs/common';

export class UserDocumentRepository implements UserRepository {
  private logger: Logger = new Logger(UserDocumentRepository.name);
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly userModel: Model<UserSchemaClass>,
  ) {}

  async create<U extends Partial<User>>(data: U): Promise<User> {
    const createdUser = new this.userModel(data);
    const userObj = await createdUser.save();

    return UserMapper.toDomain(userObj);
  }

  async findById(id: User['id']): Promise<User> {
    const userObj = await this.userModel.findById(id);
    return UserMapper.toDomain(userObj);
  }

  async findByUsername(username: User['username']): NullAble<Promise<User>> {
    const userObj = await this.userModel.findOne({ username });

    return UserMapper.toDomain(userObj);
  }

  async findMany(): Promise<User[]> {
    const userObjs = await this.userModel.find();
    return userObjs.map(UserMapper.toDomain);
  }

  count(): Promise<number> {
    return this.userModel.countDocuments();
  }

  async update<U extends Partial<Omit<User, 'id'>>>(
    data: U,
    id: string,
  ): Promise<User> {
    const userObj = await this.userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return UserMapper.toDomain(userObj);
  }

  async updateSolvedRecord(
    isChallenge: boolean,
    id: User['id'],
  ): Promise<User> {
    const solved: UpdateQuery<UserSchemaClass> = isChallenge
      ? { $inc: { totalSolvedChallenges: 1 } }
      : { $inc: { totalSolvedQuizzes: 1 } };
    const userObjs = await this.userModel.findByIdAndUpdate(id, solved);
    return UserMapper.toDomain(userObjs);
  }

  async seeds(users: CreateUserDto[]): Promise<unknown> {
    this.logger.log('Start seeding...');
    await Promise.all(users.map((user) => this.userModel.create(user)));
    this.logger.log('Seeding users finished!');
    return;
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany();

    return;
  }
}
