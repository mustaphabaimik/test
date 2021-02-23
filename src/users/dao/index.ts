export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: any;
  select?: number;
  populate?: any;
  offset?: number;
  lean?: boolean;
}

export interface QueryResults<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
  offset?: number;
}

export interface DAO<T> {
  find(query?: any, options?: QueryOptions): Promise<T[]>;

  findOne(id: number | string): Promise<T>;

  save(data: T): Promise<T>;

  update(id: number | string, data: T): Promise<T>;

  delete(id: number | string);
}
