import { Injectable } from '@nestjs/common';
import { Article } from './entity/article.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.model';
import { ArticleDTO } from './dto/article';
import { blocks } from './data/article';
import { TegService } from 'src/teg/teg.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private tegService: TegService,
  ) {}

  async createArticle(article: ArticleDTO, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    const tegs = await Promise.all(
      article.tegs.map((el) => this.tegService.getTeg(el)),
    );

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
        tegs,
      })
      .execute();
  }

  async getArticle(
    limit: number,
    page: number,
    search: string,
    strategy: 'ASC' | 'DESC',
    sortBy: 'views' | 'likes' | 'createdAt',
  ) {
    const articles = await this.articleRepo
      .createQueryBuilder()
      .leftJoinAndSelect('Article.user', 'user')
      .offset(limit * (page - 1))
      .orderBy(`Article.${sortBy}`, strategy)
      .getMany();

    const result = articles
      .filter((el) => el.title.toUpperCase().includes(search.toUpperCase()))
      .map((article) => ({ ...article, blocks }));

    if (result.length > limit) {
      return { articles: result.slice(0, limit), hasMore: true };
    }

    return { articles: result, hasMore: false };
  }

  async getArticleById(id: number) {
    const article = await this.articleRepo
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
    return { ...article, blocks };
  }
}
