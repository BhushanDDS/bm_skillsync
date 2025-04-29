import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryConfigModule } from 'src/config/cloudinary-config.module';
import { CloudinaryConfigService } from 'src/config/cloudinary.config';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule,UsersModule,PassportModule.register({ defaultStrategy: 'jwt' }),  // <-- Add this, UsersModule,
    JwtModule.register({
      global: true,
      secret: 'super_secret_key', 
      signOptions: { expiresIn: '15m' },
    }),
    CloudinaryConfigModule,MulterModule.registerAsync({
        imports: [CloudinaryConfigModule],
        inject: [CloudinaryConfigService],
        useFactory: (cloudinaryConfigService: CloudinaryConfigService) => {
          return cloudinaryConfigService.getMulterConfig();
        },
      })],
  controllers: [AuthController],
providers: [AuthService,JwtStrategy],
exports: [AuthService,PassportModule],

})
export class AuthModule {}
