import { IsString } from 'class-validator';

class AuthRefreshDto {
  @IsString()
  refreshToken: string;
}

export default AuthRefreshDto;
