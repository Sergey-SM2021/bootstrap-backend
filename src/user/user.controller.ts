import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/CreateUserDTO';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'get users' })
  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'get user by id' })
  @Get('/:login')
  getUserLogin(@Param('login') login: string) {
    return this.userService.getUserByLogin(login);
  }

  @ApiOperation({ summary: 'create user' })
  @Post('/')
  createUser(@Body(new ValidationPipe()) body: CreateUserDTO) {
    try {
      return this.userService.createUsers(body);
    } catch (error) {
      return body;
    }
  }

  @ApiOperation({ summary: 'remove user' })
  @Delete('/')
  remuveUser() {
    return this.userService.removeUsers();
  }
}
