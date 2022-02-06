import { BaseAbstractRepository } from '../base/base.abstract.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookRepositoryInterface } from './book.interface.repository';
import { TFindBook } from 'infra/entity/book/book.find.type';
import { TUpdateBook } from 'infra/entity/book/book.update.type';
import { TInsertBook } from 'infra/entity/book/book.insert.type';
import { Book, BookDocument } from 'infra/entity/book/book.entity';
import { TBookPrefs } from '@infra/types/prefs.type';
import { ArrayUtils } from '@infra/utils/array.utils';

@Injectable()
export class BookRepository
  extends BaseAbstractRepository<
    TInsertBook,
    TFindBook,
    TUpdateBook,
    Book,
    BookDocument
  >
  implements BookRepositoryInterface
{
  constructor(
    private readonly arrayUtils: ArrayUtils,
    @InjectModel(Book.name)
    private readonly booksRepository: Model<BookDocument, TFindBook>,
  ) {
    super(booksRepository);
  }

  public async getRandomBooks(
    count: number,
    prefs?: TBookPrefs[],
  ): Promise<Book[]> {
    return await this.booksRepository
      .aggregate([{ $sample: { size: count } }])
      .exec();
  }

  public async getRandomBook(prefs?: TBookPrefs[]): Promise<Book> {
    return (
      await this.booksRepository
        .aggregate([
          {
            $sample: { size: 1 },
          },
        ])
        .exec()
    )[0];
  }

  public async getBooksById(array: number[]): Promise<Book[]> {
    return await this.booksRepository.find({ offerId: { $in: array } }).exec();
  }
}
