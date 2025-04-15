export abstract class Service<T extends { id: string }> {
  abstract create(data: unknown): Promise<T>;

  abstract getMany(): Promise<T[]>;

  abstract getById(id: T['id']): Promise<T>;

  abstract update(data: Partial<Omit<T, 'id'>>, id: T['id']): Promise<T>;
}
