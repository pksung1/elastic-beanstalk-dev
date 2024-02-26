/**
 *
 * Pagination 유형
 * - 무한스크롤 페이지네이션을 구현하기 위해 사용한다.
 * - 1,2,3 .. 으로 이루어진 전체 페이지를 그릴수있도록 total, page, limit을 반환한다.
 *
 */

interface PaginatationQuery {
  page: number;
  limit: number;
}

interface PaginatatedResult<T> {
  data: T[];
  meta: {
    // 현재 페이지
    currentPage: number;

    // 전체 데이터의 수
    total?: number;

    // 한 페이지에 보여줄 데이터의 수
    limit?: number;

    // 다음 페이지가 있는지
    hasNextPage?: boolean;

    // 이전 페이지가 있는지
    hasPreviousPage?: boolean;
  };
}
