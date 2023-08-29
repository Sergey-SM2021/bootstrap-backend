import { Module } from '@nestjs/common';
import { TegService } from './teg.service';
import { TegController } from './teg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teg } from './entity/teg.model';

@Module({
  providers: [TegService],
  controllers: [TegController],
  imports: [TypeOrmModule.forFeature([Teg])],
})
export class TegModule {}
