import { Model } from 'mongoose';
import { User } from '../domain/user.domain';
import { UserRepository } from './user-abstract.repository';
import { InjectModel } from '@nestjs/mongoose';

export class UserDocumentRepository implements UserRepository {
  constructor(@InjectModel() private readonly userModel: Model) {}

  create<U extends Partial<User>>(data: U): Promise<User> {}
  findById(id: string): Promise<User> {}
  findMany(): Promise<User[]> {}

  update<U extends Partial<Omit<User, 'id'>>>(
    data: U,
    id: string,
  ): Promise<User> {}
}
