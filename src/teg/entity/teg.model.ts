import { Article } from 'src/article/entity/article.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teg {
  @OneToMany(() => Article, (article) => article.tegs)
  article: Article;
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
}
