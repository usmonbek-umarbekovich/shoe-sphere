export type RequestData<T> = {
  data: T;
};

export type ResponseData<T> = {
  data: T;
  meta: Meta;
};

type Meta = {
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
