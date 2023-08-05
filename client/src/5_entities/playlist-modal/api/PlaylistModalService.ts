import { api } from '@shared/api';
import { ITrack } from '@shared/types';

import { PlaylistModalEndpoints } from './types';

export class PlaylistModalService {
  static fetchPlaylistTracks(id: string) {
    return api.get<ITrack[]>(PlaylistModalEndpoints.FETCH_TRACKS, {
      params: { id },
    });
  }
}
