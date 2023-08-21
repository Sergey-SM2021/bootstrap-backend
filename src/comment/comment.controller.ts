import { CommentDTO } from './dto/comment';
import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'create Comment' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Body(ValidationPipe) comment: CommentDTO, @Req() req) {
    return await this.commentService.createComment(comment, req.user.id);
  }

  @ApiOperation({ summary: 'get Comments By Article Id' })
  @Get(':id')
  async getCommentsByArticleId(@Param('id') id: string) {
    return await this.commentService.getCommentsByArticleId(id.toString());
  }
}
