import { UserServiceInterface } from '@infra/services/user/user.interface.service';
import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { InitUserDto, InitUserResDto } from './dto/init-user.dto';
import {
  SetPreferredGenreDto,
  SetPreferredGenreResDto,
} from './dto/set-preferred-genre.dto';

@Controller('')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Post('init')
  public async init(@Body() userDto: InitUserDto): Promise<InitUserResDto> {
    return await this.userService.init(userDto);
  }

  @Post('setPref')
  public async setPref(
    @Body() setPrefDto: SetPreferredGenreDto,
  ): Promise<SetPreferredGenreResDto> {
    return await this.userService.setPref(setPrefDto);
  }
}
