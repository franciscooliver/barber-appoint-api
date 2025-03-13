import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/services/auth.service';
import { UsersService } from '@modules/users/services/users.service';
import { TokenBlacklistService } from '@modules/auth/services/token-blacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Post('logout')
  async logout(@Req() req: any): Promise<{ message: string }> {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await this.tokenBlacklistService.addToken(token);
    }
    return { message: 'Logged out successfully' };
  }
}
