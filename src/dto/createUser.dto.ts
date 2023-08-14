import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export default CreateUserDto;
