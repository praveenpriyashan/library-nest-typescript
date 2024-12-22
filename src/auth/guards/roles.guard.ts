import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    console.log('constructor in the RolesGuard');
  }

  canActivate(context: ExecutionContext): boolean {
    console.log('canActivate method in the RolesGuard');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      console.log('Roles decorator not found');
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      console.log('User or user roll not found');
      return false;
    }
    console.log(`user=${user}`);
    console.log(`user role=${user.role}`);
    console.log('user found');
    // return requiredRoles.some((role) => user.roles?.includes(role));
    return matchRoles(requiredRoles, user?.role);
  }
}

function matchRoles(requiredRoles: string[], userRole: string) {
  console.log('end1 canActivate method in the RolesGuard');
  return requiredRoles.some((role: string) => userRole?.includes(role));
  console.log('end2 canActivate method in the RolesGuard');
}
