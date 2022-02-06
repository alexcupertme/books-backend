import { TBookPrefs } from '@infra/types/prefs.type';
import { Book } from '../book/book.entity';

export type TFindUser = {
  vk_id?: number;
  liked_books?: Book[];
  liked_genres?: TBookPrefs[];
  registration_date?: Date;
};
