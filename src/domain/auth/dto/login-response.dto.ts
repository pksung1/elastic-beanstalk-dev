import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthToken {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}
