import { Injectable } from '@nestjs/common';
import { User } from '@entity/user/user.entity';
import { UserServiceInterface } from '@infra/services/user/user.interface.service';
import { InitUserDto, InitUserResDto } from './dto/init-user.dto';
import {
  SetPreferredGenreDto,
  SetPreferredGenreResDto,
} from './dto/set-preferred-genre.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@infra/repository/user/user.repository';
import { BookRepository } from '@infra/repository/book/book.repository';
import { Book } from '@infra/entity/book/book.entity';
import { JWTConfig } from '@constant/jwt';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async init(userDto: InitUserDto): Promise<InitUserResDto> {
    const user = new User();
    let isNew: boolean;
    let readList: [] | Book[];
    let books: [] | Book[];

    let createdUser: User;

    user.vk_id = userDto.vk_id;
    const userExist = (
      await this.userRepository.findOneByCondition({
        vk_id: userDto.vk_id,
      })
    ).toObject();
    if (!userExist) {
      createdUser = await (await this.userRepository.create(user)).toObject();
      isNew = true;
      readList = await this.bookRepository.getBooksById(user.liked_books);
      books = await this.bookRepository.getRandomBooks(2);
    } else {
      isNew = false;
      readList = await this.bookRepository.getBooksById(userExist.liked_books);
      books = await this.bookRepository.getRandomBooks(
        2,
        userExist.liked_genres,
      );
    }
    return {
      cards: books,
      isNew,
      readList,
    };
  }

  public async setPref(
    setPrefDto: SetPreferredGenreDto,
  ): Promise<SetPreferredGenreResDto> {
    const user = await this.userRepository.findOneByCondition({
      vk_id: setPrefDto.vk_id,
    });

    if (!user) return { result: 0 };

    const liked_genres = user.liked_genres;

    const foundGenre = user.liked_genres.find(
      (value) => value.id == setPrefDto.pref,
    );

    if (!foundGenre) {
      liked_genres.push({ id: setPrefDto.pref, weight: 0 });
    } else
      liked_genres[
        liked_genres.findIndex((value) => value.id == setPrefDto.pref)
      ].weight++;

    await this.userRepository.updateByCondition(
      { vk_id: user.vk_id },
      { liked_genres: liked_genres },
    );

    return { result: 1 };
  }
}
