import { TrackEntity } from '../../tracks/entities/track.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';

@Entity('favs')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => TrackEntity)
  @JoinTable()
  tracks: TrackEntity[];

  @ManyToMany(() => AlbumEntity)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity)
  @JoinTable()
  artists: ArtistEntity[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.albums) this.albums = [];
    if (!this.artists) this.artists = [];
    if (!this.tracks) this.tracks = [];
  }
}
