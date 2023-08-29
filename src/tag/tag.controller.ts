import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AddtagToArticle } from './dto/addTagToArticle';
import { TagService } from './tag.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOperation({ summary: 'create tag' })
  @Post()
  async createtag(@Body(new ValidationPipe()) body: AddtagToArticle) {
    return await this.tagService.createTag(body.tag);
  }

  @ApiOperation({ summary: 'get tag' })
  @Get(':name')
  async getTag(@Param('name') name: string) {
    return this.tagService.getTag(name);
  }

  @ApiOperation({ summary: 'get tags' })
  @Get()
  async getTags() {
    return this.tagService.getTags();
  }
}
