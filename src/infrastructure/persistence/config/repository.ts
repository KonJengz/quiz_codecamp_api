import { NullAble } from 'src/common/types/types';

export abstract class Repository<T extends { id: string }> {
  abstract create<U extends Partial<T>>(data: U): T;

  abstract findById(id: T['id']): NullAble<T>;

  abstract findMany(): Array<NullAble<T>>;

  abstract update<U extends Partial<Omit<T, 'id'>>>(data: U): T;
}
