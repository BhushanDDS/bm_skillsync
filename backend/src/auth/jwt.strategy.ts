// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
interface JwtPayload {
    sub: number;
    roles: string[]; // Must match payload key
  }
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request?.cookies?.access_token);
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'super_secret_key',
    });
  }


  async validate(payload: JwtPayload) {
    return { 

      id: payload.sub, 
      roles: payload.roles || ["some role atleat"],
    };
  }
  
}