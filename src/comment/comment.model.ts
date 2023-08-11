import { Article } from 'src/article/article.model';
import { User } from 'src/user/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  text: string;
}
