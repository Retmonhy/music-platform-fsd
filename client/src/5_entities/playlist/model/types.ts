import { IPlaylist } from '@shared/types';

export interface IPlaylistsState {
  //общие плейлисты
  playlists: IPlaylist[];
  isAllPlaylistLoading: boolean;

  //плейлисты юзера
  isUserPlaylistLoading: boolean;
  userPlaylists: IPlaylist[];
  playlistsToDelete: string[];
}
export enum PlaylistActionTypes {
  MANAGE_PLAYLIST_TO_DELETE = 'MANAGE_PLAYLIST_TO_DELETE',
  ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST',
  FETCH_USER_PLAYLISTS = 'FETCH_USER_PLAYLISTS',
  FETCH_ALL_PLAYLISTS = 'FETCH_ALL_PLAYLISTS',
  DELETE_PLAYLISTS_FROM_USER = 'DELETE_PLAYLISTS_FROM_USER',
}
