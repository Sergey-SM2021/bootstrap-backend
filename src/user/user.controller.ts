import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OpenApi } from '../decorators/OpenApi.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @OpenApi('get users', 'users')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @OpenApi('get user by id', 'user')
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  // @ApiOperation({ summary: 'get user by login' })
  // @Get('/:login')
  // getUserLogin(@Param('login') login: string) {
  //   return this.userService.getUserByLogin(login);
  // }

  // @OpenApi('create user', 'user')
  // @Post('/')
  // createUser(@Body(new ValidationPipe()) body: CreateUserDTO) {
  //   try {
  //     return this.userService.createUsers(body);
  //   } catch (error) {
  //     return body;
  //   }
  // }

  @OpenApi('delete user', 'user', false)
  @Delete('/')
  remuveUser() {
    return this.userService.removeUsers();
  }

  // #FIXME: This can do only user owner
  @OpenApi('update user', 'user', false)
  @Put('/:id')
  updateUser(
    @Body(ValidationPipe) user: CreateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, user);
  }
}
