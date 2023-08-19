import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: UserEntity) {
    const payload = { userId: user.id, login: user.login };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY || 'secret123123',
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });
  }
}
