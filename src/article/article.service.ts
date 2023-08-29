import { Injectable } from '@nestjs/common';
import { Article } from './entity/article.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.model';
import { ArticleDTO } from './dto/article';
import { blocks } from './data/article';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private tagService: TagService,
  ) {}

  async createArticle(article: ArticleDTO, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    const tags = await Promise.all(
      article.tags.map((el) => this.tagService.getTag(el)),
    );

    const newArticle = new Article();
    newArticle.title = article.title;
    newArticle.subtitle = article.subtitle;
    newArticle.createdAt = '08.10.5421';
    newArticle.img = article.img;
    newArticle.views = 0;
    newArticle.user = user;
    newArticle.tags = tags;
    return await this.articleRepo.save(newArticle);
  }

  async getArticle(
    limit: number,
    page: number,
    search: string,
    stratagy: 'ASC' | 'DESC',
    sortBy: 'views' | 'likes' | 'createdAt',
  ) {
    const articles = await this.articleRepo
      .createQueryBuilder()
      .leftJoinAndSelect('Article.user', 'user')
      .offset(limit * (page - 1))
      .orderBy(`Article.${sortBy}`, stratagy)
      .getMany();

    const result = articles
      .filter((el) => el.title.toUpperCase().includes(search.toUpperCase()))
      .map((article) => ({ ...article, blocks }));

    if (result.length > limit) {
      return { articles: result.slice(0, limit), hasMore: true };
    }

    return { articles: result, hasMore: false };
  }

  async getArticleById(id: string) {
    const article = await this.articleRepo.findOne({ where: { id: id } });
    return { ...article, blocks };
  }
}
