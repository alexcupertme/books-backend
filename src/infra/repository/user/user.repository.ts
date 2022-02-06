import { BaseAbstractRepository } from '../base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../entity/user/user.entity';
import { UserRepositoryInterface } from './user.interface.repository';
import { TFindUser } from 'infra/entity/user/user.find.type';
import { TUpdateUser } from 'infra/entity/user/user.update.type';
import { TInsertUser } from 'infra/entity/user/user.insert.entity';
import { UpdateResult } from 'mongodb';
import { Book } from '@infra/entity/book/book.entity';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<
    TInsertUser,
    TFindUser,
    TUpdateUser,
    User,
    UserDocument
  >
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: Model<UserDocument>,
  ) {
    super(usersRepository);
  }

  public async addLikedBook(
    vk_id: number,
    bookId: number,
  ): Promise<UpdateResult> {
    return await this.usersRepository
      .updateOne(
        { vk_id },
        {
          $push: {
            liked_books: bookId,
          },
        },
      )
      .exec();
  }
}
