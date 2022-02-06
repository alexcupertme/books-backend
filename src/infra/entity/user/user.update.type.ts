import { TBookPrefs } from '@infra/types/prefs.type';
import { Book } from '../book/book.entity';

export type TUpdateUser = {
  liked_books?: Book[];
  liked_genres?: TBookPrefs[];
};
