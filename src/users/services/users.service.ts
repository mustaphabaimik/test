import { Injectable } from '@nestjs/common';
import { UsersDAO } from '../dao/users.dao';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersDAO: UsersDAO) {}

  async findAll(): Promise<User[]> {
    return await this.usersDAO.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersDAO.findOne(id);
  }

  async create(dto: CreateUserDTO): Promise<User> {
    return await this.usersDAO.save(dto);
  }

  async update(id: number, dto: UpdateUserDTO): Promise<User> {
    return await this.usersDAO.update(id, dto);
  }

  async delete(id: number) {
    return await this.usersDAO.delete(id);
  }
}
