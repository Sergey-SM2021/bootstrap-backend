import { IsString } from 'class-validator';

export class ArticleDTO {
  @IsString()
  img: string;
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
}
