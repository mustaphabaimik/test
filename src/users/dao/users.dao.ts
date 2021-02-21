import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DAO } from '.';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersDAO implements DAO<User> {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  async find(query: any = {}): Promise<User[]> {
    return this.UserModel.find(query);
  }

  async findOne(id: string | number): Promise<User> {
    return this.UserModel.findById(id);
  }

  async save(data: User): Promise<User> {
    const user = new this.UserModel(data);
    return this.UserModel.create(user);
  }

  async update(id: string | number, data: Partial<User>): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string | number) {
    return this.UserModel.deleteOne({ _id: id });
  }
}
