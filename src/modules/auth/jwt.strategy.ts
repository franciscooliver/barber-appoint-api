import { UsersService } from '@modules/users/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Usa ConfigService para obter a chave
    });
  }

  async validate(payload: any) {
    // Busca o usuário no banco com base no sub do token
    const user = await this.usersService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
