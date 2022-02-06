import {
  InitUserDto,
  InitUserResDto,
} from '@components/user/dto/init-user.dto';
import {
  SetPreferredGenreDto,
  SetPreferredGenreResDto,
} from '@components/user/dto/set-preferred-genre.dto';

export interface UserServiceInterface {
  init(data: InitUserDto): Promise<InitUserResDto>;
  setPref(data: SetPreferredGenreDto): Promise<SetPreferredGenreResDto>;
}
