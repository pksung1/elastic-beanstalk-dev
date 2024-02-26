import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { UserRole } from 'src/domain/user/constant/user';

export class BaseUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @IsString()
  @Exclude()
  password: string;

  @ApiProperty()
  @IsString()
  nickname?: string;

  @ApiProperty()
  @IsString({ each: true })
  roles?: UserRole[];

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;
}
