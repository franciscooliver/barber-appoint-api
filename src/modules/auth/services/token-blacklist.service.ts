import { Injectable } from '@nestjs/common';
import { TokenBlacklist } from '@modules/auth/entities/token-blacklist.entity';
import { TokenBlacklistRepository } from '@modules/auth/repositories/token-blacklist.repository';

@Injectable()
export class TokenBlacklistService {
  constructor(
    private readonly tokenBlacklistRepository: TokenBlacklistRepository,
  ) {}

  async addToken(token: string): Promise<void> {
    const blacklistToken = new TokenBlacklist();
    blacklistToken.token = token;
    return this.tokenBlacklistRepository.save(blacklistToken);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const result =  await this.tokenBlacklistRepository.isTokenRevoked(token);
    return !!result;
  }
}
