import { IPlaylistPayload, PlaylistService } from '../../api';

export class Utilities {
  public static CreatePlaylist(playlistData: IPlaylistPayload) {
    return PlaylistService.createPlaylist(playlistData);
  }
  public static DeletePlaylistById(id: string) {
    return PlaylistService.deletePlaylist(id);
  }
  public static UpdatePlaylist(id: string, data: IPlaylistPayload) {
    return PlaylistService.updatePlaylist(id, data);
  }
}
