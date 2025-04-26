// src/commons/guards/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { UsersService } from '../../users/users.service';
import { ROLES_KEY } from './role.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private usersService: UsersService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // 1. Get required roles from decorator
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) return true;
  
      // 2. Get user ID from request
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.id;
      if (!userId) throw new UnauthorizedException();
  
      // 3. Fetch user with roles from database
      const user = await this.usersService.findById(userId);
      if (!user) throw new UnauthorizedException('User not found');
      if (!user.role || !Array.isArray(user.role)) {
        throw new UnauthorizedException('Invalid user role configuration');
      }
  
      // 4. Check role permissions
      return requiredRoles.some((role) => user.role.includes(role));
    }
  }