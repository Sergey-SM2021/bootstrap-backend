import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'get users' })
  @UseGuards(JwtAuthGuard)
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

  @ApiOperation({ summary: 'update user' })
  @Put('/:id')
  updateUser(
    @Body(ValidationPipe) user: CreateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, user);
  }
}
