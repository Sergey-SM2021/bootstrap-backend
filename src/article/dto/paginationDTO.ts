export class PaginationDTO {
  limit: number;
  page: number;
  strategy: 'ASC' | 'DESC';
  sortBy: 'views' | 'likes' | 'createdAt';
  tags?: string;
  search: string;
}
