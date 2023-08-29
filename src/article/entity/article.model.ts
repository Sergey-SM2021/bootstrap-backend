import { User } from 'src/user/user.model';
import { Comment } from 'src/comment/comment.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from 'src/tag/entity/tag.model';

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
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
