import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
  ) {}

  async signup(dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  async login(dto: CreateUserDto) {
    const existUser = await this.usersRepository.findOne({
      where: { login: dto.login, password: dto.password },
    });
    return existUser.toResponse();
  }
}
