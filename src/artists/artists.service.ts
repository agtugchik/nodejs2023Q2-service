import { Injectable } from '@nestjs/common';
import db from 'src/db/db';

@Injectable()
export class TracksService {
  getTracks() {
    return db.tracks;
  }
}
