export interface IGenericService<T, ID> {
  findAll(): Promise<T[]>;
  find(id: ID): Promise<T>;
  where(entity: T): Promise<T>;
  insert(entity: T): Promise<T>;
  update(id: ID, entity: T): Promise<T>;
  delete(id: ID): Promise<T>;
}
