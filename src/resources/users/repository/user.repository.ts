import { Model } from 'mongoose';
import { User } from '../domain/user.domain';
import { UserRepository } from './user-abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaClass } from './entity/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { NullAble } from 'src/common/types/types';

export class UserDocumentRepository implements UserRepository {
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

  async findByUserName(username: User['username']): NullAble<Promise<User>> {
    const userObj = await this.userModel.findOne({ username });

    return UserMapper.toDomain(userObj);
  }

  async findMany(): Promise<User[]> {
    const userObjs = await this.userModel.find();
    return userObjs.map(UserMapper.toDomain);
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
}
