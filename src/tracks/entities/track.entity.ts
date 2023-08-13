import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
// import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  // ManyToMany,
} from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId!: string | null;

  @Column({ nullable: true })
  albumId!: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.tracks)
  // favorite: FavoriteEntity[];
}
