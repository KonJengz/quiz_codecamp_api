import { NullAble } from 'src/common/types/types';

export abstract class Repository<T extends { id: string }> {
  abstract create<U extends Partial<T>>(data: U): Promise<T>;

  abstract findById(id: T['id']): Promise<NullAble<T>>;

  abstract findMany(): Promise<Array<T>>;

  abstract update<U extends Partial<Omit<T, 'id'>>>(data: U): Promise<T>;
}
