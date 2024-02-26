export class OrderDto<T extends OrderQuery<T>> {
  order: T;
}
