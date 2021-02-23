import { Injectable } from '@nestjs/common';
import { QueryOptions, QueryResults } from '../dao';
import { UsersDAO } from '../dao/users.dao';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';

export interface FindResults<T> {
  docs: T[];
  meta: {
    limit: number;
    page: number;
    totalPages: number;
    totalDocs: number;
  };
}

@Injectable()
export class UsersService {
  constructor(private readonly usersDAO: UsersDAO) {}

  async find(query: any, options: QueryOptions): Promise<FindResults<User>> {
    const results: QueryResults<User>[] = await this.usersDAO.find(
      query,
      options,
    );
    return { docs: results[0]?.docs, meta: results[0]?.meta[0] };
  }

  async findOne(id: number): Promise<User> {
    return await this.usersDAO.findOne(id);
  }

  async create(dto: CreateUserDTO): Promise<User> {
    return await this.usersDAO.save({ ...dto });
  }

  async update(id: number, dto: UpdateUserDTO): Promise<User> {
    return await this.usersDAO.update(id, dto);
  }

  async delete(id: number) {
    return await this.usersDAO.delete(id);
  }
}
