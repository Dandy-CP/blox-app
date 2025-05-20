export interface Pagination {
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
    links: {
      previous: boolean | null;
      current: string;
      next: string;
    };
  };
}

export interface FilterState {
  page: number;
  pageSize: number;
  search: string;
  gender: string;
  status: string;
}
