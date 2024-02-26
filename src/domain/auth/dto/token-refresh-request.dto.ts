import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenRefreshRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken: string;
}
