import { Book } from '@infra/entity/book/book.entity';
import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class GetReadListDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  vk_id: number;
}

export class GetReadListResDto {
  bookObj: Book[];
}
