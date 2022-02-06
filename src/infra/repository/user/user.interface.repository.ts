import { BaseInterfaceRepository } from '../base/base.interface.repository';
import { TFindUser } from 'infra/entity/user/user.find.type';
import { TInsertUser } from 'infra/entity/user/user.insert.entity';
import { TUpdateUser } from 'infra/entity/user/user.update.type';
import { User, UserDocument } from '@infra/entity/user/user.entity';
import { Book } from '@infra/entity/book/book.entity';
import { UpdateResult } from 'mongodb';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<
    TInsertUser,
    TFindUser,
    TUpdateUser,
    User,
    UserDocument
  > {
  addLikedBook(vk_id: number, book: number): Promise<UpdateResult>;
}
