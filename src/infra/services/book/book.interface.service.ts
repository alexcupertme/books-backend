import {
  AddToReadListByIdDto,
  AddToReadListByIdResDto,
} from '@components/book/dto/add-to-read-list-by-id.dto';

import {
  GetReadListResDto,
  GetReadListDto,
} from '@components/book/dto/get-readlist.dto';

import {
  RateBookDto,
  RateBookResDto,
} from '@components/book/dto/rate-book.dto';

export interface UserServiceInterface {
  rateBook(data: RateBookDto): RateBookResDto;

  getReadList(data: GetReadListDto): GetReadListResDto;

  addToReadListById(data: AddToReadListByIdDto): AddToReadListByIdResDto;
}
