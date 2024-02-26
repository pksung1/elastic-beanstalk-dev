import { Type } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';

export function OmitCreateType<
  T extends { id: any; updatedAt: any; createdAt: any; deletedAt?: any },
>(classRef: Type<T>) {
  return OmitType(classRef, [
    'id',
    'updatedAt',
    'createdAt',
    'deletedAt',
  ] as const);
}
