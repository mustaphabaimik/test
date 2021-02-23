import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DAO, QueryOptions } from '.';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersDAO implements DAO<User> {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  async find(query: any = {}, options: QueryOptions): Promise<User[]> {
    const { page, limit } = options;
    console.log(page, limit);

    return this.UserModel.aggregate([
      {
        $facet: {
          docs: [
            { $match: query },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
          total: [{ $count: 'total' }],
        },
      },
    ]);
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
