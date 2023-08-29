import { IsString } from 'class-validator';

export class AddTegToArticle {
  @IsString()
  teg: string;
}
