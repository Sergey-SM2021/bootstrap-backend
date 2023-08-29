export class PaginationDTO {
  limit: number;
  page: number;
  // filters
  stratagy: 'ASC' | 'DESC';
  sortBy: 'views' | 'likes' | 'createdAt';
  tags: string[];
  search: string;
}
