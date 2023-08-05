import { IPlaylist } from '@shared/types';

import { PlaylistTrack } from '../lib';

export enum PlaylistModalMode {
  Edit = 'EditPlaylist',
  Create = 'CreatePlaylist',
}
export interface IPlaylistModalState {
  mode: PlaylistModalMode;
  isVisible: boolean;
  info: IPlaylist | null;
  trackPool: PlaylistTrack[];
  selectedTracks: PlaylistTrack[];
}
export enum PlaylistModalActionTypes {
  SET_MODE = 'SET_MODE',
  COVER = 'PLAYLIST_COVER',
  VISIBLE = 'PLAYLIST_VISIBLE',
  TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX',
  RESET_MODAL_STATE = 'PLAYLIST_RESET_STATE',
  LOAD_PLAYLIST_STATE = 'LOAD_PLAYLIST_STATE',
  ADD_TO_CURRENT_PLAYLIST = 'ADD_TO_CURRENT_PLAYLIST',
}
