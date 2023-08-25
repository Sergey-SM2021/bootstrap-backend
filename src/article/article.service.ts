import { Injectable } from '@nestjs/common';
import { Article } from './article.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.model';
import { ArticleDTO } from './dto/article';
import { blocks } from './data/article';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createArticle(article: ArticleDTO, userId: number) {
    const user = await this.userRepo
      .createQueryBuilder()
      .where('id = :userId', { userId })
      .getOne();

    await this.articleRepo
      .createQueryBuilder()
      .insert()
      .into(Article)
      .values({
        title: article.title,
        subtitle: article.subtitle,
        createdAt: '08.10.5421',
        img: article.img,
        views: 0,
        user,
      })
      .execute();
  }

  async getArticle(limit: number, page: number) {
    const articles = await this.articleRepo
      .createQueryBuilder()
      .leftJoin('Article.user', 'user')
      .limit(limit)
      .offset(limit * (page - 1))
      .getMany();

    return articles.map((article) => ({ ...article, blocks }));
  }

  async getArticleById(id: number) {
    const article = await this.articleRepo
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
    return { ...article, blocks };
  }
}
