import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import DBConfig from './_config/db.config';

const dbConfig = DBConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [DBConfig],
    }),
    MongooseModule.forRoot(
      dbConfig.url,
      dbConfig.options,
      // {
      //   connectionFactory: (connection: Connection) => {
      //     connection.plugin(mongoosePaginate);
      //     connection.config = dbConfig.options;
      //     return connection;
      //   },
      // },
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
