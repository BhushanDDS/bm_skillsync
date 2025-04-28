import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user-dto';
import { RegisterDto } from './dto/register-user-dto';
import { Response ,Request} from 'express';
import { AuthGuard } from 'src/commons/guards/Authguard';
import { access } from 'fs';

@Controller('auth')
export class AuthController {

constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
}

@Post('login')
async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
  const result = await this.authService.login(dto.email, dto.password);
  res.cookie('access_token', result.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refresh_token', result.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { message:"Logged in", user: result.user , accessToken: result.accessToken, refreshToken: result.refreshToken };
}


@Post('refresh')
async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  const refreshToken = req.cookies['refresh_token'];
  if (!refreshToken) throw new UnauthorizedException('No refresh token');

  try {
    const newToken = await this.authService.refreshToken(refreshToken);
    
    res.cookie('access_token', newToken.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return { message: 'Token refreshed' };
  } catch (error) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    throw new UnauthorizedException('Session expired');
  }
}

@UseGuards(AuthGuard)
@Get('me')
async getMe(@Req() req: Request) {
  const token = req.cookies['access_token'];
  if (!token) throw new UnauthorizedException('No token');

  return this.authService.verify(token);
}


@Post('logout')
  @UseGuards(AuthGuard)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request
  ) {
    const refreshToken = req.cookies['refresh_token'];
    
    try {
      // Invalidate refresh token
      await this.authService.logout(refreshToken);
    } catch (error) {
      // Handle invalid tokens gracefully
    }

    // Clear cookies
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    });
    
    res.clearCookie('refresh_token', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    });

    return { message: 'Logged out' };
  }

}
