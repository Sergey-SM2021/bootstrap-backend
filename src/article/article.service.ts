import { Injectable } from '@nestjs/common';
import { Article } from './entity/article.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getArticleById(id: string) {
    const article = await this.articleRepo.findOne({
      where: { id: id },
      relations: { tags: true },
    });
    return { ...article, blocks };
  }

  private async getArticlesLength() {
    return (await this.articleRepo.find()).length;
  }

  async getTheSameArticles() {
    return await this.articleRepo.find({ take: 6 });
  }

  private async getArticlesIdsWichHasTags(tagsIds: string) {
    const articlesIds = await this.articleRepo
      .createQueryBuilder()
      .leftJoinAndSelect('Article.user', 'user')
      .leftJoinAndSelect('Article.tags', 'tag')
      .where('tag.id IN (:...ids)', { ids: tagsIds.split(',') })
      .select('Article.id')
      .getRawMany();

    const articlesIdsList = await articlesIds
      .map((el) => el.Article_id)
      .reduce((prev: number[], current: number) => {
        if (prev.includes(current)) {
          return prev;
        }
        return [...prev, current];
      }, []);

    return articlesIdsList;
  }

  async getArticleFilter(params: PaginationDTO) {
    const {
      limit = 10,
      page = 1,
      sortBy = 'createdAt',
      strategy = 'ASC',
      search = '',
      tags,
    } = params;

    if (tags && tags.length) {
      const articlesIDs = await this.getArticlesIdsWichHasTags(tags);

      const articles = await this.articleRepo
        .createQueryBuilder()
        .leftJoinAndSelect('Article.user', 'user')
        .leftJoinAndSelect('Article.tags', 'tags')
        .where('Article.id IN (:...articlesIDs)', { articlesIDs })
        .orderBy(`Article.${sortBy}`, strategy)
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();

      return {
        articles: articles
          .filter((el) => el.title.toUpperCase().includes(search.toUpperCase()))
          .map((article) => ({ ...article, blocks })),
        length: await this.getArticlesLength(),
        hasMore:
          (
            await this.articleRepo
              .createQueryBuilder()
              .leftJoinAndSelect('Article.user', 'user')
              .leftJoinAndSelect('Article.tags', 'tags')
              .where('Article.id IN (:...articlesIDs)', { articlesIDs })
              .orderBy(`Article.${sortBy}`, strategy)
              .getMany()
          ).length >
          page * limit,
      };
    } else {
      const articles = await this.articleRepo
        .createQueryBuilder()
        .leftJoinAndSelect('Article.user', 'user')
        .leftJoinAndSelect('Article.tags', 'tags')
        .orderBy(`Article.${sortBy}`, strategy)
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();

      return {
        articles: articles
          .filter((el) => el.title.toUpperCase().includes(search.toUpperCase()))
          .map((article) => ({ ...article, blocks })),
        length: page * limit,
        hasMore:
          (
            await this.articleRepo
              .createQueryBuilder()
              .leftJoinAndSelect('Article.user', 'user')
              .leftJoinAndSelect('Article.tags', 'tags')
              .orderBy(`Article.${sortBy}`, strategy)
              .getMany()
          ).length >
          page * limit,
      };
    }
  }
}
