import {
  Prop,
  raw,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from '../book/book.entity';
import { TBookPrefs } from '@infra/types/prefs.type';

export type UserDocument = User & Document;

export interface IUser {
  vk_id?: number;
  number?: Book[];
  liked_genres?: TBookPrefs[];
  registration_date?: Date;
}

@SchemaDecorator()
export class User implements IUser {
  @Prop()
  vk_id: number;

  @Prop()
  liked_books: number[];

  @Prop(
    raw([
      {
        weight: { type: Number },
        id: { type: String },
      },
    ]),
  )
  liked_genres: TBookPrefs[];

  @Prop({ default: () => new Date() })
  registration_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
