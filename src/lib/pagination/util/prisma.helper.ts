export const toPaginationQuery = (
  params: PaginatationQuery = { page: 1, limit: 10 },
): { skip: number; take: number } => {
  return {
    skip: (params.page - 1) * params.limit,
    take: params.limit,
  };
};
