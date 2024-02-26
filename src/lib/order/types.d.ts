type OrderQuery<T extends object> = {
  [K in keyof T]?: 'asc' | 'desc';
};
