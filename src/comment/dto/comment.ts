import { IsInt, IsString } from 'class-validator';

export class CommentDTO {
  @IsInt()
  articleId: number;
  @IsString()
  text: string;
}
