import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDTO } from 'src/user/dto/CreateUserDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body(ValidationPipe) body: CreateUserDTO) {
    return this.authService.register(body);
  }
}
