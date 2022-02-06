import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '@repository/user/user.interface.repository';
import { BookRepositoryInterface } from '@infra/repository/book/book.interface.repository';
import { JwtService } from '@nestjs/jwt';
import { RateBookDto, RateBookResDto } from './dto/rate-book.dto';
import { GetReadListDto, GetReadListResDto } from './dto/get-readlist.dto';
import {
  AddToReadListByIdDto,
  AddToReadListByIdResDto,
} from './dto/add-to-read-list-by-id.dto';
import { UserRepository } from '@infra/repository/user/user.repository';
import { BookRepository } from '@infra/repository/book/book.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async rateBook(
    rateBookDto: RateBookDto,
    type: 'like' | 'dislike',
  ): Promise<RateBookResDto> {
    const user = await (
      await this.userRepository.findOneByCondition({
        vk_id: rateBookDto.vk_id,
      })
    ).toObject();

    if (!user)
      return {
        result: 0,
        nextBook: null,
      };

    const book = await await this.bookRepository.findOneByCondition({
      offerId: rateBookDto.id,
    });
    if (!book)
      return {
        result: 0,
        nextBook: null,
      };
    if (user.liked_books.find((usrBook) => usrBook == book.offerId))
      return {
        result: 0,
        nextBook: null,
      };

    if (!book) return { result: 0, nextBook: null };

    let updatedGenres = [];
    if (type == 'like') {
      await this.userRepository.addLikedBook(rateBookDto.vk_id, book.offerId);
      updatedGenres = book.genresList.map((genre) => {
        const userGenre = user.liked_genres.filter((val) => val.id == genre)[0];

        if (userGenre)
          return { weight: userGenre.weight + 1, id: userGenre.id };
        else return { weight: 1, id: genre };
      });
    } else if (type == 'dislike') {
      updatedGenres = book.genresList.map((genre) => {
        const userGenre = user.liked_genres.filter((val) => val.id == genre)[0];

        if (userGenre) return { weight: userGenre.weight, id: userGenre.id };
        else return { weight: 1, id: genre };
      });
    }

    const userGenres = [];
    updatedGenres.forEach((updated) => {
      userGenres.push(updated);
    });

    user.liked_genres.forEach((liked) => {
      if (!updatedGenres.find((updated) => liked.id == updated.id)) {
        userGenres.push(liked);
      }
    });
    await this.userRepository.updateOneByCondition(
      { vk_id: user.vk_id },
      {
        liked_genres: userGenres,
      },
    );
    return {
      result: 1,
      nextBook: await this.bookRepository.getRandomBook(user.liked_genres),
    };
  }
  public async getRL(
    getReadListDto: GetReadListDto,
  ): Promise<GetReadListResDto> {
    const user = await this.userRepository.findOneByCondition({
      vk_id: getReadListDto.vk_id,
    });

    if (!user)
      return {
        bookObj: [],
      };

    return {
      bookObj: await this.bookRepository.getBooksById(
        await (
          await this.userRepository.findOneByCondition({ vk_id: user.vk_id })
        ).liked_books,
      ),
    };
  }

  public async addToRL(
    addToReadListByIdDto: AddToReadListByIdDto,
  ): Promise<AddToReadListByIdResDto> {
    const user = await this.userRepository.findOneByCondition({
      vk_id: addToReadListByIdDto.vk_id,
    });

    if (!user)
      return {
        result: 0,
      };

    const book = await this.bookRepository.findOneByCondition({
      offerId: addToReadListByIdDto.id,
    });
    if (!book) return { result: 0 };
    await this.userRepository.addLikedBook(user.vk_id, book.offerId);
    return {
      result: 1,
    };
  }
}
