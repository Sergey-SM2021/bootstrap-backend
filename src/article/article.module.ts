import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.model';
import { User } from 'src/user/user.model';
import { Teg } from 'src/teg/entity/teg.model';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([Article, User, Teg])],
})
export class ArticleModule {}
