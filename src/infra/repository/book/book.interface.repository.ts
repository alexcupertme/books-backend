import { BaseInterfaceRepository } from '../base/base.interface.repository';
import { TFindBook } from 'infra/entity/book/book.find.type';
import { TUpdateBook } from 'infra/entity/book/book.update.type';
import { TInsertBook } from 'infra/entity/book/book.insert.type';
import { Book, BookDocument } from '@infra/entity/book/book.entity';
import { TBookPrefs } from '@infra/types/prefs.type';

export interface BookRepositoryInterface
  extends BaseInterfaceRepository<
    TInsertBook,
    TFindBook,
    TUpdateBook,
    Book,
    BookDocument
  > {
  getRandomBooks(count: number, prefs?: TBookPrefs[]): Promise<Book[]>;
  getRandomBook(prefs?: TBookPrefs[]): Promise<Book>;
  getBooksById(array?: number[]): Promise<Book[]>;
}
