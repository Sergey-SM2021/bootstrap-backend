import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.usersService.getUserByLogin(username);
    if (user && user.password === password) {
      return user;
    }
  }
}
