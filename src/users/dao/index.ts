export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: any;
  select?: number;
  populate?: any;
}

export interface QueryResults<T> {
  docs: T[];
  meta: [
    {
      limit: number;
      page: number;
      totalPages: number;
      totalDocs: number;
    },
  ];
}

export interface DAO<T> {
  find(query?: any, options?: QueryOptions): Promise<QueryResults<T>[]>;

  findOne(id: number | string): Promise<T>;

  save(data: T): Promise<T>;

  update(id: number | string, data: T): Promise<T>;

  delete(id: number | string);
}
