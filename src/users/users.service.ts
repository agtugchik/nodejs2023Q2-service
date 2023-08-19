import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import CreateUserDto from 'src/dto/createUser.dto';
import UpdatePasswordDto from 'src/dto/updatePassword.dro';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import errorResponses from 'src/helpers/clientErrorResponses';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getUser(userId: string) {
    const user = (await errorResponses(
      userId,
      'user',
      this.userRepository,
    )) as UserEntity;
    return user.toResponse();
  }

  async createUser(userDto: CreateUserDto) {
    const now = Date.now();
    const newUser = {
      login: userDto.login,
      password: await this.hashPassword(userDto.password),
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    const createUser = this.userRepository.create(newUser);
    return (await this.userRepository.save(createUser)).toResponse();
  }

  async deleteUser(userId: string) {
    await errorResponses(userId, 'user', this.userRepository);
    await this.userRepository.delete(userId);
  }

  async updatePassword(dto: UpdatePasswordDto, userId: string) {
    if (!dto.newPassword || !dto.oldPassword)
      throw new BadRequestException('Fields must be filled');
    const user = (await errorResponses(
      userId,
      'user',
      this.userRepository,
    )) as UserEntity;
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }
    user.password = dto.newPassword;
    user.version++;
    user.createdAt = Number(user.createdAt);
    user.updatedAt = Date.now();
    return (await this.userRepository.save(user)).toResponse();
  }
  private async hashPassword(pass: string) {
    return hash(pass, process.env.CRYPT_SALT || 10);
  }
}
