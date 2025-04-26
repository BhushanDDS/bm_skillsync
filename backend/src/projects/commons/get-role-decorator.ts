import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('UserRole decorator called', request.user.roles);

    return request.user?.roles; 
  }
);