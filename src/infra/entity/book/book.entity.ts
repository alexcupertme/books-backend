import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

export interface IBook {
  offerId: number;
  type: string;
  available: boolean;
  url: string;
  price: number;
  categoryId: number;
  picture: string;
  author: string;
  name: string;
  publisher: string;
  series: string;
  year: string;
  ISBN: string;
  genresList: number[];
  description: string;
  downloadable: boolean;
  age: number;
  lang: string;
}

@Schema()
export class Book implements IBook {
  @Prop()
  offerId: number;

  @Prop()
  type: string;

  @Prop()
  available: boolean;

  @Prop()
  url: string;

  @Prop()
  price: number;

  @Prop()
  categoryId: number;

  @Prop()
  picture: string;

  @Prop()
  author: string;

  @Prop()
  name: string;

  @Prop()
  publisher: string;

  @Prop()
  series: string;

  @Prop()
  year: string;

  @Prop()
  ISBN: string;

  @Prop()
  genresList: number[];

  @Prop()
  description: string;

  @Prop()
  downloadable: boolean;

  @Prop()
  age: number;

  @Prop()
  lang: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
