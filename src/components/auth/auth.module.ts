import { Module } from '@nestjs/common';
import { UserRepository } from '@repository/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from '@constant/jwt';

@Module({
  imports: [
    UserRepository,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN + 's' },
    }),
  ],
})
export class AuthModule {}
