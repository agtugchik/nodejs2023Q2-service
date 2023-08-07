import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import CreateUserDto from 'src/dto/createUser.dto';
import UpdatePasswordDto from 'src/dto/updatePassword.dro';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import validateUUID from 'src/helpers/validateUUID';

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
    if (!validateUUID(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toResponse();
  }

  async createUser(userDto: CreateUserDto) {
    const now = Date.now();
    const newUser = {
      ...userDto,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    const createUser = this.userRepository.create(newUser);

    return (await this.userRepository.save(createUser)).toResponse();
  }

  async deleteUser(userId: string) {
    if (!validateUUID(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(userId);
  }

  async updatePassword(dto: UpdatePasswordDto, userId: string) {
    if (!dto.newPassword || !dto.oldPassword) throw new BadRequestException('');
    if (!validateUUID(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    user.password = dto.newPassword;
    user.version++;
    user.createdAt = Number(user.createdAt);
    user.updatedAt = Date.now();
    return (await this.userRepository.save(user)).toResponse();
  }
}
