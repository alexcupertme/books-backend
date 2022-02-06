import { Book } from '@infra/entity/book/book.entity';
import { IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class InitUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  vk_id: number;
}

export class InitUserResDto {
  isNew: boolean;
  readList: Book[];
  cards: Book[];
}
