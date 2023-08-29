import { User } from 'src/user/user.model';
import { Comment } from 'src/comment/comment.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teg } from 'src/teg/teg.model';

@Entity()
export class Article {
  @Column({ default: 0 })
  likes: number;
  @Column()
  img: string;
  @Column()
  views: number;
  @Column()
  createdAt: string;
  @ManyToOne(() => User, (user) => user.articles)
  user: User;
  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
  @Column()
  title: string;
  @Column()
  subtitle: string;
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => Teg)
  tegs: Teg[];
}
