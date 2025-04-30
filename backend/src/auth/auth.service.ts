import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

import { UserRole } from 'src/projects/commons/get-role-decorator';
import { EmailService } from 'src/email/email.service';
import { UpdateProfile } from './dto/pro-pass-dto';
@Injectable()
export class AuthService {


    constructor(
        private jwt: JwtService,
        private usersService: UsersService,
        private emailService: EmailService // Add this
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


      async getById(userId: number) {
        const user = await this.usersService.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        // Remove sensitive data before returning
        delete user.password;
        return user;
      }
    
      async updateUser(userId: number, dto: UpdateProfile)  {
        const updatedUser = await this.usersService.updateUser(userId, dto);
        if (!updatedUser) {
          throw new NotFoundException('User not found');
        }
        // Remove sensitive data before returning
        delete updatedUser.password;
        return updatedUser;
      }
    
      async updateProFile(userId: number, fileUrl: string) {
        const updatedUser = await this.usersService.updateMilestoneFile(userId, fileUrl);
        if (!updatedUser) {
          throw new NotFoundException('User not found');
        }
        // Remove sensitive data before returning
        delete updatedUser.password;
        return updatedUser;
      }
    
      async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.usersService.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        
        if (!(await bcrypt.compare(oldPassword, user.password))) {
          throw new UnauthorizedException('Old password is incorrect');
        }
        
        user.password = await bcrypt.hash(newPassword, 10);
        const updatedUser = await this.usersService.saveUser(user);
        // Remove sensitive data before returning
        delete updatedUser.password;
        return updatedUser;
      }
/*
      updateProFile(userId: number, fileUrl: string) {
        this.usersService.updateMilestoneFile(userId,fileUrl);

      }
      updateUser(userId: number, dto: UpdateProfile) {
        this.usersService.updateUser(userId,dto);
      }

      getById(userId: number) {

        const user= this.usersService.findById(userId);
        return user;
      }

      async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.usersService.findById(userId);
        if (!(await bcrypt.compare(oldPassword, user.password))) {
          throw new UnauthorizedException('Old password is incorrect');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        return this.usersService.saveUser(user);
      }
     
      */


      ///////////////
      async requestReset(email: string) {
        // Add null check first
  if (!email) {
    throw new BadRequestException('Email is required');
  }

  // Then trim and validate
  const trimmedEmail = email.trim();
  if (!this.emailService.isValidEmail(trimmedEmail)) {
    throw new BadRequestException('Invalid email format');
  }
      
        // Check user existence AFTER validation
        const user = await this.usersService.findByEmail(trimmedEmail);
        if (!user) {
          return { message: 'If an account exists, a reset link has been sent' };
        }
      
        // Generate token and send email
        const resetToken = this.jwt.sign(
          { email: trimmedEmail },
          { expiresIn: '15m' }
        );
      
        try {
          await this.emailService.sendPasswordResetEmail(user.email, resetToken);
          return { message: 'Password reset link sent to your email' };
        } catch (error) {
          console.error('Password reset error:', error);
          throw new HttpException(
            'Failed to send reset email',
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }

      ///////////
      async resetPassword(token: string, newPassword: string) {
        try {
          const { email } = this.jwt.verify(token);
          const user = await this.usersService.findByEmail(email);
          
          if (!user) {
            throw new Error('User not found');
          }
    
          user.password = await bcrypt.hash(newPassword, 10);
          await this.usersService.saveUser(user);
          return { message: 'Password updated successfully' };
    
        } catch (error) {
          throw new Error('Invalid or expired token');
        }
      }
    

}
