import { IsString } from 'class-validator';

export class BaseAuthTokenDto {
  id: string;

  @IsString()
  userId: string;

  @IsString()
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
