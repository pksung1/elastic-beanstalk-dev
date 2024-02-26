import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/domain/user/constant/user';

export const PUBLIC = 'PUBLIC';
export const ROLES_KEY = 'roles';

export type RoleType = UserRole | 'PUBLIC';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
