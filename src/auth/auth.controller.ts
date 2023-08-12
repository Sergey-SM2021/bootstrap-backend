import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body(ValidationPipe) loginData: LoginDTO) {
    return this.authService.login(loginData);
  }

  @Post('register')
  register(@Body(ValidationPipe) loginData: LoginDTO) {
    return this.authService.register(loginData);
  }
}
