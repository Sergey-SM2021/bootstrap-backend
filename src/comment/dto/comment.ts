import { IsInt, IsString } from 'class-validator';

export class CommentDTO {
  @IsInt()
  articleId: number;
  @IsInt()
  userId: number;
  @IsString()
  text: string;
}
