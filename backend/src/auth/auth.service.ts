import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
 
    constructor(
        private jwt: JwtService,
        private usersService: UsersService
      ) {}
    
      async register(dto: any) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) throw new UnauthorizedException('Email already exists');
        const hash = await bcrypt.hash(dto.password, 10);
        return this.usersService.create({ ...dto, password: hash ,category:"none" });
      }
    
      async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    
        const accessToken = await this.jwt.signAsync(
          { 
            sub: user.id, 
            roles: user.role // Array of roles
          }, 
          { expiresIn: '15m' }
        );        const refreshToken = await this.jwt.signAsync({ sub: user.id }, { secret: 'refreshtokensecreat', expiresIn: '7d' });
    
        return {
          accessToken,
          refreshToken,
          user,
        };
      }
    
      async verify(token: string) {
        try {
          const payload = await this.jwt.verifyAsync(token);
          return this.usersService.findById(payload.sub);
        } catch (e) {
          throw new UnauthorizedException('Invalid or expired token');
        }
      }

      async refreshToken(oldRefreshToken: string) {
        try {
          // Verify and check revocation
          const payload = await this.jwt.verifyAsync(oldRefreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
          });
    
          // Get fresh user data
          const user = await this.usersService.findById(payload.sub);
          if (!user) throw new UnauthorizedException('User not found');
    
          // Generate new access token with latest roles
          const newAccessToken = await this.jwt.signAsync(
            { sub: user.id, roles: user.role },
            { expiresIn: '15m' }
          );
    
          return { accessToken: newAccessToken };
        } catch (err) {
          throw new UnauthorizedException('Invalid or expired refresh token');
        }
      }
    


      async logout(refreshToken: string) {
        try {
          const payload = await this.jwt.verifyAsync(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
          });
        
    
          return true;
        } catch (err) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }

      


}
