import { IPlaylist, IPlaylistData } from '@shared/types';

export enum PlaylistEndpoints {
  CREATE = '/playlist/create',
  DELETE = '/playlist/delete',
  UPDATE = '/playlist/update',
  ADD = '/playlist/add',
  REMOVE = '/playlist/remove',
  FETCH_USER_PLAYLISTS = '/playlist',
  FETCH_ALL_PLAYLISTS = '/playlist/all',
  MANAGE_PLAYLIST_TRACKS = '/playlist/tracks/manage',
}
export interface IManagePlaylistTracksPayload {
  playlistId: string;
  trackId: string;
  action: ManageAction;
}
export interface ICreatePlaylistResponse {
  isSuccess: boolean;
  playlist: IPlaylist;
}
export enum ManageAction {
  Remove,
  Add,
}
export interface IPlaylistPayload extends IPlaylistData {
  cover: string;
  tracks: string[];
}
