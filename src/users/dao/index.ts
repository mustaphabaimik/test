export interface DAO<T> {
  find(query?: any): Promise<T[]>;

  findOne(id: number | string): Promise<T>;

  save(data: T): Promise<T>;

  update(id: number | string, data: T): Promise<T>;

  delete(id: number | string);
}
