import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class SetPreferredGenreDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  pref: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  vk_id: number;
}
export class SetPreferredGenreResDto {
  result: number;
}
