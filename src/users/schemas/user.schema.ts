import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// type AggregatePaginate<T> = (
//   query?: FilterQuery<T>,
//   options?: AggregateQueryOptions,
//   callback?: (err: any, result: AggregateQueryResults<T>) => void,
// ) => Promise<AggregateQueryResults<T>>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  // @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
  // owner: User;
  // static aggregatePaginate: AggregatePaginate<User>;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.plugin(mongoosePaginate);

export default UserSchema;
