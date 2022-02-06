import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class AddToReadListByIdDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  vk_id: number;
}
export class AddToReadListByIdResDto {
  result: number;
}
