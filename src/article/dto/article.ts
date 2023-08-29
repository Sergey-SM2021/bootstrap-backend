import { IsArray, IsString } from 'class-validator';

export class ArticleDTO {
  @IsString()
  img: string;
  @IsString()
  title: string;
  @IsString()
  subtitle: string;
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
