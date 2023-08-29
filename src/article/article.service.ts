import { Injectable } from '@nestjs/common';
import { Article } from './entity/article.model';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/user.model';
import { ArticleDTO } from './dto/article';
import { blocks } from './data/article';
import { TagService } from 'src/tag/tag.service';
import { PaginationDTO } from './dto/paginationDTO';

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

  async getArticle(params: PaginationDTO) {
    const {
      limit,
      page,
      search = '',
      sortBy = 'createdAt',
      stratagy = 'ASC',
      tags,
    } = params;

    let articles;

    articles = await this.articleRepo.find({
      relations: {
        user: true,
        tags: true,
      },
      skip: limit * (page - 1),
      order: {
        [sortBy]: stratagy,
      },
    });

    if (tags && tags.length) {
      const ids = await Promise.all(
        tags
          .split(',')
          .map(async (el) => (await this.tagService.getTag(el)).id),
      );

      articles = await this.articleRepo.find({
        relations: {
          user: true,
          tags: true,
        },
        where: {
          tags: {
            id: In(ids),
          },
        },
        skip: limit * (page - 1),
        order: {
          [sortBy]: stratagy,
        },
      });
    }

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
