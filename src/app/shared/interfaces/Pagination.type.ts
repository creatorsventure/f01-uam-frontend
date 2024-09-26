export interface IPagination {
  pageIndex: number;
  pageSize: number;
  sortField: string | null;
  sortOrder: string | null;
  searchField: string | '';
  searchValue: string | '';
  total: number;
  loading: boolean;
  result: any[];
}

export class Pagination implements IPagination {
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  result: any[];
  searchField: string | '';
  searchValue: string | '';
  sortField: string | null;
  sortOrder: string | null;
  total: number;

  constructor(
    loading: boolean,
    pageIndex: number,
    pageSize: number,
    result: any[],
    searchField: string | '',
    searchValue: string | '',
    sortField: string | null,
    sortOrder: string | null,
    total: number
  ) {
    this.loading = loading;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.result = result;
    this.searchField = searchField;
    this.searchValue = searchValue;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.total = total;
  }
}
