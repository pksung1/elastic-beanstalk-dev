import { PickType } from '@nestjs/mapped-types';
import { BaseAuthTokenDto } from './base-auth-token.dto';

export class CreateAuthTokenDto extends PickType(BaseAuthTokenDto, [
  'userId',
  'refreshToken',
] as const) {}
