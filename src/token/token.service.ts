import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(
    user: UserEntity,
    key: 'JWT_SECRET_KEY' | 'JWT_SECRET_REFRESH_KEY',
    expireTime: 'TOKEN_EXPIRE_TIME' | 'TOKEN_REFRESH_EXPIRE_TIME',
  ) {
    const payload = { userId: user.id, login: user.login };
    return this.jwtService.sign(payload, {
      secret: this.configService.get(key),
      expiresIn: this.configService.get(expireTime),
    });
  }

  async decodeJwtToken(token: string) {
    return this.jwtService.decode(token);
  }
}
