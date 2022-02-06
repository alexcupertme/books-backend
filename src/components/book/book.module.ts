import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from '@constant/jwt';
import { UserRepositoryModule } from '@infra/repository/user/user.repository.module';
import { BookRepositoryModule } from '@infra/repository/book/book.repository.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN + 's' },
    }),
    UserRepositoryModule,
    BookRepositoryModule,
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
