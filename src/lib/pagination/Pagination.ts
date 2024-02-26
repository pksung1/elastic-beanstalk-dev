import { instanceToPlain } from 'class-transformer';

export class Paginated<T> implements PaginatatedResult<T> {
  data: T[];
  meta: {
    currentPage: number;
    total?: number;
    limit?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };

  constructor(data: T[], meta: PaginatatedResult<T>['meta']) {
    this.data = data;
    this.meta = meta;
  }

  getMeta() {
    return this.meta;
  }

  toJson() {
    return instanceToPlain<PaginatatedResult<T>>(this);
  }
}

export function paginatedBuilder<T>({ data, meta }: PaginatatedResult<T>) {
  return new Paginated<T>(data, meta);
}
