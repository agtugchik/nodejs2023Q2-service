import { IsString } from 'class-validator';

class UpdatePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}

export default UpdatePasswordDto;
