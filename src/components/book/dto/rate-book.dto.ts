import { Book } from '@infra/entity/book/book.entity';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RateBookDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  vk_id: number;
}

export class RateBookResDto {
  result: number;
  nextBook: Book | null;
}
