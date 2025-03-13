import { TokenBlacklistService } from '@modules/auth/services/token-blacklist.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware {
  constructor(
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    // Verifique se o token está na blacklist
    const isRevoked = await this.tokenBlacklistService.isTokenRevoked(token);
    if (isRevoked) {
      throw new UnauthorizedException('Token has been revoked');
    }

    try {
      req.user = this.jwtService.verify(token);
      next();
    } catch (error) {
      return res.status(401).json({
        statusCode: 401,
        timestamp: new Date().toISOString(),
        path: req.originalUrl || req.url,
        message: 'Invalid token',
      });
    }
  }
}
