import { Prisma } from '@prisma/client';
import { OmitType } from '@nestjs/swagger';
import { BaseUserWithPasswordDto } from './base-user-with-password.dto';

export class CreateUserDto extends OmitType(BaseUserWithPasswordDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  toPrisma(): Prisma.UserCreateInput {
    return {
      username: this.username,
      password: this.password,
      nickname: this.nickname,
      roles: this.roles.map((role) => role),
    };
  }
}
