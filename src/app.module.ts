import { BookModule } from '@components/book/book.module';
import { UserModule } from '@components/user/user.module';
import { BookRepositoryModule } from '@infra/repository/book/book.repository.module';
import { UserRepositoryModule } from '@infra/repository/user/user.repository.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_HOST_DEV}:${process.env.MONGODB_PORT}/${process.env.DATABASE_NAME_DEV}`,
      {
        pass: process.env.MONGODB_PASSWORD_DEV,
        user: process.env.MONGODB_USERNAME_DEV,
      },
    ),
    BookModule,
    UserModule,
    UserRepositoryModule,
    BookRepositoryModule,
  ],
})
export class AppModule {}
