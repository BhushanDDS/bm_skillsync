import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest<Request>();
  
      const token = req.cookies?.['access_token'];
      if (!token) throw new UnauthorizedException('Access token not found');
  
      try {
        const payload = await this.jwtService.verifyAsync(token);
        return true;
      } catch (e) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  