export interface Home {
  ownerId: string;
  name: string;
  id: string;
}

export interface PaginatedHomeResponse {
  pageSize: number;
  count: number;
  homes: Home[];
  page: number;
}
