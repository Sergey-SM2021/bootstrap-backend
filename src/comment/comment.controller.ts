import { CommentDTO } from './dto/comment';
import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'create Comment' })
  @Post()
  async createComment(@Body(ValidationPipe) comment: CommentDTO) {
    return await this.commentService.createComment(comment);
  }

  @ApiOperation({ summary: 'get Comments By Article Id' })
  @Get(':id')
  async getCommentsByArticleId(@Param('id', ParseIntPipe) id: number) {
    return await this.commentService.getCommentsByArticleId(id);
  }
}
