import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { IPaginationParams, IPlaylist } from '@shared/types';

import { IManagePlaylistTracksPayload, PlaylistService } from '../api';
import { PlaylistActionTypes } from './types';

//управляет списком плейлистов (внешних, которые созданы другими пользователями), которые подлежат удалению после выхода со страницы плейлистов
export const managePlaylistToDeleteFromUser = createAction<string>(PlaylistActionTypes.MANAGE_PLAYLIST_TO_DELETE);
//удаляет/добавляет трекив  плейтист
export const managePlaylistTracks = createAsyncThunk(PlaylistActionTypes.ADD_TO_PLAYLIST, async (params: IManagePlaylistTracksPayload, ta) => {
  try {
    const { action } = params;
    const { data } = await PlaylistService.managePlaylistTracks(params);
    return { playlist: data, action };
  } catch (error) {
    console.error('managePlaylistTracks ERROR: ', error);
    return ta.rejectWithValue(error.response.data);
  }
});
//запрашивает плейлисты: пользловательсякие
export const fetchUserPlaylists = createAsyncThunk(PlaylistActionTypes.FETCH_USER_PLAYLISTS, async (_, ta) => {
  try {
    const { data } = await PlaylistService.fetchUserPlaylists();
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('fetchUserPlaylists ERROR: ', error);
    return ta.rejectWithValue(error.response.data);
  }
});
//запрашивает все плейлисты
export const fetchAllPlaylists = createAsyncThunk<IPlaylist[], IPaginationParams, { rejectValue: IPlaylist[] }>(
  PlaylistActionTypes.FETCH_ALL_PLAYLISTS,
  async (params, ta) => {
    try {
      const { data } = await PlaylistService.fetchPlaylists(params);
      if (data) {
        return data;
      }
    } catch (error) {
      console.error('fetchPlaylists ERROR: ', error);
      //тут возможно ошибка, добавть обработку в редьюсере
      return ta.rejectWithValue([]);
    }
  }
);
//удаляет плейлисты из пользовательских
export const deletePlaylists = createAsyncThunk(PlaylistActionTypes.DELETE_PLAYLISTS_FROM_USER, async (ids: string[], ta) => {
  try {
    const { data } = await PlaylistService.removePlaylistsFromUser(ids);
    return data;
  } catch (error) {
    console.error('deletePlaylists ERROR: ', error);
    return ta.rejectWithValue(error.response.data);
  }
});
