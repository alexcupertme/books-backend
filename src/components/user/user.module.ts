import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { BookRepositoryModule } from '@infra/repository/book/book.repository.module';
import { UserRepositoryModule } from '@infra/repository/user/user.repository.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN + 's' },
    }),
    BookRepositoryModule,
    UserRepositoryModule,
  ],
  providers: [
    {
      provide: 'UserServiceInterface',
      useClass: UserService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
