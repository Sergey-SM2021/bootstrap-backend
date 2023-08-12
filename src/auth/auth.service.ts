import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private userService: UserService,
  ) {}

  async login({ login, password }: LoginDTO) {
    const user = await this.userRepo
      .createQueryBuilder()
      .where('login = :login and password = :password', { login, password })
      .getOne();

    if (user) {
      return user;
    }

    throw new HttpException('Ошибка регистрации', HttpStatus.BAD_REQUEST);
  }

  async register({ login, password }: LoginDTO) {
    const user = await this.userRepo
      .createQueryBuilder()
      .where('login = :login', { login })
      .getOne();

    if (user) {
      throw new HttpException('Ошибка регистрации', HttpStatus.BAD_REQUEST);
    }

    await this.userService.createUsers({
      login,
      password,
      name: 'Alex',
      avatar: 'https://kino.vl.ru/kino/images/big_496754681448821.jpg',
      age: 67,
      city: 'Санкт-питербург',
      country: 'Россия',
      currency: 'ERO',
      nickname: 'Супер-мега разрушитель',
    });
  }
}
