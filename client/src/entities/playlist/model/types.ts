import { IPlaylist, ITrack } from '@shared/types';

export class PlaylistTrack {
  track: ITrack;
  isChecked: boolean;
  constructor(track: ITrack, isChecked: boolean = true) {
    this.isChecked = isChecked;
    this.track = track;
  }
}
export enum PlaylistMode {
  Edit = 'EditPlaylist',
  Create = 'CreatePlaylist',
}
export interface IPlaylistModalState {
  mode: PlaylistMode;
  isVisible: boolean;
  info: IPlaylist | null;
  trackPool: PlaylistTrack[];
  selectedTracks: PlaylistTrack[];
}
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
  //SYNC
  VISIBLE = 'PLAYLIST_VISIBLE',
  COVER = 'PLAYLIST_COVER',
  SET_MODE = 'SET_MODE',
  TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX',
  ADD_TO_CURRENT_PLAYLIST = 'ADD_TO_CURRENT_PLAYLIST',
  RESET_MODAL_STATE = 'PLAYLIST_RESET_STATE',
  MANAGE_PLAYLIST_TO_DELETE = 'MANAGE_PLAYLIST_TO_DELETE',
  // ASYNC
  LOAD_PLAYLIST_STATE = 'LOAD_PLAYLIST_STATE',
  ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST',
  FETCH_USER_PLAYLISTS = 'FETCH_USER_PLAYLISTS',
  FETCH_ALL_PLAYLISTS = 'FETCH_ALL_PLAYLISTS',
  DELETE_PLAYLISTS_FROM_USER = 'DELETE_PLAYLISTS_FROM_USER',
}
