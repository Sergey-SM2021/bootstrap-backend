import { IsString } from 'class-validator';

export class AddtagToArticle {
  @IsString()
  tag: string;
}
