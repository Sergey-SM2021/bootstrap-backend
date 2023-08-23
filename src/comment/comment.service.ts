import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.model';
import { CommentDTO } from './dto/comment';
import { User } from 'src/user/user.model';
import { Article } from 'src/article/article.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Article) private ArticleRepository: Repository<Article>,
  ) {}

  async createComment(comment: CommentDTO, userId: number) {
    const article = await this.ArticleRepository.createQueryBuilder()
      .where('id = :id', { id: comment.articleId })
      .getOne();

    const user = await this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id: userId })
      .getOne();

    const newCommentTamplate = new Comment();
    newCommentTamplate.user = user;
    newCommentTamplate.text = comment.text;
    newCommentTamplate.article = article;
    const newComment = await this.commentRepository.save(newCommentTamplate);

    return newComment;
  }

  async getCommentsByArticleId(articleId: string) {
    return this.commentRepository.find({
      relations: {
        article: true,
        user: true,
      },
      where: {
        article: {
          id: articleId,
        },
      },
    });
  }
}
