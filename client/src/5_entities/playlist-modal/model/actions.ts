import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IPlaylist, ITrack } from '@shared/types';

import { PlaylistModalService } from '../api';
import { PlaylistModalActionTypes, PlaylistModalMode } from './types';

export const addToCurrentPlaylist = createAction<ITrack>(PlaylistModalActionTypes.ADD_TO_CURRENT_PLAYLIST);
export const resetModalState = createAction(PlaylistModalActionTypes.RESET_MODAL_STATE);
export const setVisible = createAction<boolean>(PlaylistModalActionTypes.VISIBLE);
export const setCover = createAction<string | null>(PlaylistModalActionTypes.COVER);
export const setMode = createAction<PlaylistModalMode>(PlaylistModalActionTypes.SET_MODE);
export const toggleCheckbox = createAction<string>(PlaylistModalActionTypes.TOGGLE_CHECKBOX);

//загружает подробные данные о плейлисте, когда открывается модалка
export const loadState = createAsyncThunk(PlaylistModalActionTypes.LOAD_PLAYLIST_STATE, async (loadingState: IPlaylist, ta) => {
  try {
    const { data } = await PlaylistModalService.fetchPlaylistTracks(loadingState.id);
    return { info: loadingState, tracks: data };
  } catch (error) {
    console.error('loadPlaylistState ERROR: ', error);
    return ta.rejectWithValue(error.response.data);
  }
});
