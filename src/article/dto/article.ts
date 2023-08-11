import { IsNumber, IsString } from 'class-validator';

export class ArticleDTO {
  @IsString()
  img: string;
  @IsNumber()
  userId: number;
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
}
