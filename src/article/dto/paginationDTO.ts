export class PaginationDTO {
  limit: number;
  page: number;
  // filters
  strategy: 'ASC' | 'DESC';
  sortBy: 'views' | 'likes' | 'createdAt';
  tegs: string;
  search: string;
}
