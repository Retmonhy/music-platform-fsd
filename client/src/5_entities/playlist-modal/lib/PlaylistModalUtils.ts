import { PlaylistModalService } from '../api';

export class PlaylistModalUtils {
  constructor() {}
  public static LoadPlaylistModalState(id: string) {
    return PlaylistModalService.fetchPlaylistTracks(id);
  }
}
