import { ITrack } from '@shared/types';

export class PlaylistTrack {
  track: ITrack;
  isChecked: boolean;
  constructor(track: ITrack, isChecked: boolean = true) {
    this.isChecked = isChecked;
    this.track = track;
  }
}
