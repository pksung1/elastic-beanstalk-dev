import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PaginatedParams implements PaginatationQuery {
  @ApiProperty({ description: '검색 페이지' })
  @IsInt()
  page: number;

  @ApiProperty({ description: '페이지당 보여질 개수' })
  @IsInt()
  limit: number;
}

export interface PaginatedWithFilter<FILTER> {
  meta?: PaginatedParams;
  filter?: FILTER;
}
