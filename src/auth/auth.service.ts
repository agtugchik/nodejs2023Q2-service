import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
  ) {}

  async signup(dto: CreateUserDto) {
    const existUser = await this.getExistUser(dto.login);
    if (existUser) throw new BadRequestException('User login already used');
    return await this.usersService.createUser(dto);
  }

  async login(dto: CreateUserDto) {
    const existUser = await this.getExistUser(dto.login);
    const isValidPassword = await compare(dto.password, existUser.password);
    if (!existUser || !isValidPassword)
      throw new ForbiddenException('Login or password incorrect');
    return existUser.toResponse();
  }

  private async getExistUser(login: string) {
    const existUser = await this.usersRepository.findOne({
      where: { login: login },
    });
    return existUser;
  }
}
