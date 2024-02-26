import { Type } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';

export function OmitUpdateType<
  T extends { updatedAt: any; createdAt: any; deletedAt?: any },
>(classRef: Type<T>) {
  return OmitType(classRef, ['updatedAt', 'createdAt', 'deletedAt'] as const);
}
