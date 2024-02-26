import { OmitType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class BaseUserWithPasswordDto extends OmitType(BaseUserDto, [
  'password',
]) {
  password: string;
}
