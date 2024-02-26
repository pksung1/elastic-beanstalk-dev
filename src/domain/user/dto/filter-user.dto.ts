import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';
import { IsBoolean } from 'class-validator';

export class FilterUserDto extends OmitType(BaseUserDto, [
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {
  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
}
