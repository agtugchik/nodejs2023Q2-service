import { IsString, IsBoolean } from 'class-validator';

class CreateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

export default CreateArtistDto;
