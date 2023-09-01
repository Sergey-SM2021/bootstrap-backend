import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { Comment } from './comment/comment.model';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entity/article.model';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { tagModule } from './tag/tag.module';
import { Tag } from './tag/entity/tag.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'pgql2003',
      password: 'pgql2003',
      database: 'bootstrap',
      entities: [User, Article, Comment, Tag],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    CommentModule,
    AuthModule,
    tagModule,
  ],
})
export class AppModule {}
