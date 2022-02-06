import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { BookService } from './book.service';
import {
  AddToReadListByIdDto,
  AddToReadListByIdResDto,
} from './dto/add-to-read-list-by-id.dto';
import { GetReadListDto, GetReadListResDto } from './dto/get-readlist.dto';
import { RateBookDto, RateBookResDto } from './dto/rate-book.dto';

@Controller('')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('dislike')
  public async dislike(
    @Body() rateBookDto: RateBookDto,
    @Headers('Authorization') token: string,
  ): Promise<RateBookResDto> {
    return await this.bookService.rateBook(rateBookDto, 'dislike');
  }

  @Post('like')
  public async like(
    @Body() rateBookDto: RateBookDto,
    @Headers('Authorization') token: string,
  ): Promise<RateBookResDto> {
    return await this.bookService.rateBook(rateBookDto, 'like');
  }

  @Post('getRL')
  public async getRL(
    @Body() getReadListDto: GetReadListDto,
    @Headers('Authorization') token: string,
  ): Promise<GetReadListResDto> {
    return await this.bookService.getRL(getReadListDto);
  }

  @Post('addToRL')
  public async addToRL(
    @Body() addToReadListByIdDto: AddToReadListByIdDto,
    @Headers('Authorization') token: string,
  ): Promise<AddToReadListByIdResDto> {
    return await this.bookService.addToRL(addToReadListByIdDto);
  }
}
