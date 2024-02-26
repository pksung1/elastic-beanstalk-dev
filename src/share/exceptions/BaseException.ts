import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IBaseExcetpion {
  errorCode: string;
  statusCode: number;
  timestamp: string;
  path: string;
}

export const UNKNOWN_ERROR = '999999';

export class BaseException extends HttpException implements IBaseExcetpion {
  constructor(
    errorMessage: string,
    statusCode: number,
    errorCode: string,
    { prefix }: { prefix?: string } = {},
  ) {
    super(errorMessage, statusCode);
    this.errorCode = `${prefix ?? ''}-${errorCode}`;
    this.timestamp = new Date().toISOString();
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}
