import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenBlacklist } from '../entities/token-blacklist.entity';

@Injectable()
export class TokenBlacklistRepository {
  constructor(
    @InjectRepository(TokenBlacklist)
    private repository: Repository<TokenBlacklist>,
  ) {}

  async save(tokenBlacklist: TokenBlacklist): Promise<void> {
    await this.repository.save(tokenBlacklist);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    return !!(await this.repository.findOne({ where: { token } }));
  }
}
