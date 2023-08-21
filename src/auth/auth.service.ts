import {
  // BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { TokenService } from '../token/token.service';
import AuthRefreshDto from '../dto/authRefresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(dto: CreateUserDto) {
    // const existUser = await this.getExistUser(dto.login);
    // if (existUser) throw new BadRequestException('User login already used');
    return await this.usersService.createUser(dto);
  }

  async login(dto: CreateUserDto) {
    const existUser = await this.getExistUser(dto.login);
    const isValidPassword = await compare(dto.password, existUser?.password);
    if (!existUser || !isValidPassword)
      throw new ForbiddenException('Login or password incorrect');
    return await this.getTokens(existUser);
  }

  async refresh(dto: AuthRefreshDto) {
    const { userId, login, exp } = (await this.tokenService.decodeJwtToken(
      dto.refreshToken,
    )) as { userId: string; login: string; exp: number };
    const user = await this.usersRepository.findOne({
      where: { id: userId, login },
    });
    if (!user || exp * 1000 < Date.now()) throw new ForbiddenException('');
    return await this.getTokens(user);
  }

  private async getExistUser(login: string) {
    const existUser = await this.usersRepository.findOne({
      where: { login: login },
    });
    return existUser;
  }

  private async getTokens(user: UserEntity) {
    const accessToken = await this.tokenService.generateJwtToken(
      user,
      'JWT_SECRET_KEY',
      'TOKEN_EXPIRE_TIME',
    );
    const refreshToken = await this.tokenService.generateJwtToken(
      user,
      'JWT_SECRET_REFRESH_KEY',
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
    return { accessToken, refreshToken };
  }
}
