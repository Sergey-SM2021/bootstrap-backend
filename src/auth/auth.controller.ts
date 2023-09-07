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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'register' })
  @Post('register')
  async register(@Body(ValidationPipe) body: CreateUserDTO) {
    return this.authService.register(body);
  }
}
