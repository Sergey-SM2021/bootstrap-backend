import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
