import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JWTStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JWTStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '6h' } }),
  ],
})
export class AuthModule {}
