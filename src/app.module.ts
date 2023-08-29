import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { Comment } from './comment/comment.model';
import { ArticleModule } from './article/article.module';
import { Article } from './article/article.model';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pgql2003',
      password: 'pgql2003',
      database: 'bootstrap',
      entities: [User, Article, Comment],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
