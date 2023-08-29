import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AddTegToArticle } from './dto/addTegToArticle';
import { TegService } from './teg.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('teg')
@Controller('teg')
export class TegController {
  constructor(private tegService: TegService) {}

  @ApiOperation({ summary: 'create teg' })
  @Post()
  async createTeg(@Body(new ValidationPipe()) body: AddTegToArticle) {
    return await this.tegService.createTeg(body.teg);
  }

  @ApiOperation({ summary: 'get teg' })
  @Get(':name')
  async getTeg(@Param('name') name: string) {
    return this.tegService.getTeg(name);
  }
}
