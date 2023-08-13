import { ArtistEntity } from 'src/artists/entities/artist.entity';
// import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  // ManyToMany,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album)
  track: TrackEntity[];

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.albums)
  // favorite: FavoriteEntity[];
}
