import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [    PassportModule.register({ defaultStrategy: 'jwt' }),  // <-- Add this, UsersModule,
    JwtModule.register({
      global: true,
      secret: 'super_secret_key', 
      signOptions: { expiresIn: '15m' },
    }),UsersModule],
  controllers: [AuthController],
providers: [AuthService,JwtStrategy],
exports: [AuthService,PassportModule],

})
export class AuthModule {}
