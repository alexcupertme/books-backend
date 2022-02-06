import { Module } from '@nestjs/common';
import { UserRepository } from '@repository/user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '@infra/entity/user/user.entity';
import { UtilsModule } from '@infra/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UtilsModule,
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
