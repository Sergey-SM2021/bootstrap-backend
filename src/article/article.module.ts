import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.model';
import { User } from 'src/user/user.model';
import { Tag } from 'src/tag/entity/tag.model';
import { TagService } from 'src/tag/tag.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, TagService],
  imports: [TypeOrmModule.forFeature([Article, User, Tag])],
})
export class ArticleModule {}
