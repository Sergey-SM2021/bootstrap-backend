import { IsNumber } from 'class-validator';

export class PaginationDTO {
  @IsNumber()
  limit: number;
  @IsNumber()
  page: number;
}
