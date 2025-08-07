import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { TokenBlacklistService } from '@modules/auth/services/token-blacklist.service';
import { TokenBlacklistRepository } from '@modules/auth/repositories/token-blacklist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklist } from './entities/token-blacklist.entity';
import { AuthMiddleware } from './auth-middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([TokenBlacklist]),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    ConfigService,
    TokenBlacklistService,
    TokenBlacklistRepository,
    AuthMiddleware,
  ],
  exports: [TokenBlacklistService, AuthService, JwtModule],
})
export class AuthModule {}
