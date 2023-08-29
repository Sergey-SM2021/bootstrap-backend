import { Article } from 'src/article/entity/article.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @OneToMany(() => Article, (article) => article.tags)
  article: Article;
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
}
