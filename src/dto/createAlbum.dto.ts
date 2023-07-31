import { IsString, IsInt, ValidateIf } from 'class-validator';

class CreateAlbumDto {
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}

export default CreateAlbumDto;
