import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.usersRepository.createQueryBuilder().getMany();
  }

  async getUserById(id: number) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async getUserByLogin(login: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('login = :login', { login })
      .getOne();
  }

  async createUsers(UserContent: CreateUserDTO) {
    const user = new User();
    user.login = UserContent.login;
    user.password = UserContent.password;
    user.name = UserContent.name;
    user.avatar = UserContent.avatar;
    user.age = UserContent.age;
    user.city = UserContent.city;
    user.country = UserContent.country;
    user.currency = UserContent.currency;
    user.nickname = UserContent.nickname;
    user.lastname = UserContent.lastname;
    await this.usersRepository.save(user);
  }

  async removeUsers() {
    return this.usersRepository.createQueryBuilder().delete().execute();
  }

  async update(id: number, user: CreateUserDTO) {
    const userToUpdate = await this.usersRepository.findOne({ where: { id } });
    return await this.usersRepository.save({ ...userToUpdate, ...user });
  }
}
