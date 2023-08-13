import { AlbumEntity } from 'src/albums/entities/album.entity';
// import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  // ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  album: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  track: TrackEntity[];

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.artists)
  // favorite: FavoriteEntity[];
}
