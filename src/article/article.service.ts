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

  async createArticle(article: ArticleDTO) {
    const user = await this.userRepo
      .createQueryBuilder()
      .where('id = :userId', { userId: article.userId })
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

  async getArticle() {
    return this.articleRepo.createQueryBuilder().getMany();
  }

  async getArticleById(id: number) {
    const article = await this.articleRepo
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
    return { ...article, blocks };
  }
}
