import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStratagy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JWTStratagy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService, LocalStratagy, JWTStratagy],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '6h' } }),
  ],
})
export class AuthModule {}
