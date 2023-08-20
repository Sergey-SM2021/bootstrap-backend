import { Article } from 'src/article/article.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  login: string;
  @Column()
  password: string;
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
  @Column()
  name: string;
  @Column()
  avatar: string;
  @Column()
  age: number;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column()
  currency: string;
  @Column()
  nickname: string;
  @Column({ nullable: true })
  lastname: string;
}
