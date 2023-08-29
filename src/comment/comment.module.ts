import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.model';
import { User } from 'src/user/user.model';
import { Article } from 'src/article/entity/article.model';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([Comment, User, Article])],
})
export class CommentModule {}
