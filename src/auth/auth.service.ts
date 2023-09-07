import { CreateUserDTO } from './../user/dto/CreateUserDTO';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(body: CreateUserDTO) {
    return this.userService.createUsers(body);
  }

  async login(token: string) {
    const avatar = (
      await this.userService.getUserById(this.jwtService.decode(token)['id'])
    ).avatar;

    return {
      id: this.jwtService.decode(token)['id'],
      token,
      avatar: avatar,
      role: 'user',
    };
  }
}
