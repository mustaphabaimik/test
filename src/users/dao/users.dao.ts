import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DAO, QueryOptions, QueryResults } from '.';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersDAO implements DAO<User> {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  async find(
    query: any = {},
    options: QueryOptions,
  ): Promise<QueryResults<User>[]> {
    const { page, limit } = options;

    // Prepare Projection
    const projection = {};
    if (Array.isArray(options?.select) && options?.select?.length) {
      options.select.forEach((attr) => (projection[attr] = 1));
    } else {
      Object.keys(this.UserModel.schema.obj).forEach(
        (attr) => (projection[attr] = 1),
      );
    }

    // Prepare Aggregation query
    const data: QueryResults<User>[] = await this.UserModel.aggregate([
      {
        $match: { ...query /* , active: true */ },
      },
      {
        $project: {
          ...projection,
          password: -1,
        },
      },
      {
        $facet: {
          meta: [
            { $count: 'totalDocs' },
            {
              $addFields: {
                page,
                limit,
                totalPages: {
                  $ceil: {
                    $divide: ['$totalDocs', limit],
                  },
                },
              },
            },
          ],
          docs: [
            {
              $sort: {
                ...options.sort,
                createdAt: -1,
              },
            },
            {
              $skip: (page - 1) * limit,
            },
            { $limit: limit },
          ],
        },
      },
    ]);
    return data;
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
