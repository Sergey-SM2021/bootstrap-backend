export class PaginationDTO {
  limit: number;
  page: number;
  stratagy: 'ASC' | 'DESC';
  sortBy: 'views' | 'likes' | 'createdAt';
  tags?: string[];
  search: string;
}
