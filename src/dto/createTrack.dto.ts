import { IsString, IsInt, ValidateIf } from 'class-validator';

class CreateTrackDto {
  @IsString()
  name: string;
  @IsInt()
  duration: number;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
}

export default CreateTrackDto;
