import { BaseDomain } from 'src/common/base-domain';
import { NullAble } from 'src/common/types/types';

type CreateDto<T extends BaseDomain> = Partial<
  Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

export abstract class Repository<
  T extends BaseDomain,
  U extends CreateDto<T> = CreateDto<T>,
> {
  abstract create(data: U): Promise<T>;

  abstract findById(id: T['id']): Promise<NullAble<T>>;

  abstract findMany(): Promise<Array<T>>;

  abstract update<U extends Partial<Omit<T, 'id'>>>(
    data: U,
    id: T['id'],
  ): Promise<T>;
}
