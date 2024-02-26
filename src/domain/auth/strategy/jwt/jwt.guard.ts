import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ROLES_KEY, PUBLIC } from './roles.decorator';
import { UserRole } from 'src/domain/user/constant/user';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const availableRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = context.switchToHttp().getRequest().user;

    if (this.isPublic(availableRoles)) {
      return true;
    }

    if (user && this.hasRole(availableRoles, user)) {
      return true;
    }

    if (user && this.isAdmin(user.roles)) {
      return true;
    }
    return false;
  }

  isPublic(roles: string[]) {
    return roles?.includes(PUBLIC) ?? false;
  }

  isAdmin(userRoles: string[]) {
    return userRoles?.includes(UserRole.ADMIN) ?? false;
  }

  hasRole(roles: string[], user: any) {
    const roleMap = user.roles.reduce(
      (acc, role) => ({ ...acc[role], [role]: true }),
      {},
    );

    for (const role of roles) {
      if (roleMap[role]) {
        return true;
      }
    }
    return false;
  }
}
