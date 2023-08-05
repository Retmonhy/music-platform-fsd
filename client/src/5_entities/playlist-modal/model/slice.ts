import { createSlice } from '@reduxjs/toolkit';

import { IPlaylist } from '@shared/types';

import { PlaylistTrack } from '../lib';
import { addToCurrentPlaylist, loadState, resetModalState, setCover, setMode, setVisible, toggleCheckbox } from './actions';
import { IPlaylistModalState, PlaylistModalMode } from './types';

const initialState: IPlaylistModalState = {
  trackPool: [],
  selectedTracks: [],
  isVisible: false,
  info: null,
  mode: PlaylistModalMode.Create,
};
export const PlaylistModalModel = createSlice({
  name: 'playlist-modal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCurrentPlaylist, (state, action) => {
        state.selectedTracks = [new PlaylistTrack(action.payload), ...state.selectedTracks];
      })
      .addCase(resetModalState, (state) => {
        state = { ...initialState };
        return state;
      })
      .addCase(setVisible, (state, action) => {
        state.isVisible = action.payload;
      })
      .addCase(setCover, (state, action) => {
        if (!state.info) state.info = {} as IPlaylist;
        state.info.cover = action.payload;
      })
      .addCase(toggleCheckbox, (state, action) => {
        state.selectedTracks = state.selectedTracks.map((i) => {
          if (i.track._id === action.payload) {
            return { ...i, isChecked: !i.isChecked };
          }
          return i;
        });
      })
      .addCase(loadState.fulfilled, (state, action) => {
        state.info = action.payload.info;
        state.selectedTracks = action.payload.tracks.map((tr) => new PlaylistTrack(tr, true));
      })
      .addCase(setMode, (state, action) => {
        state.mode = action.payload;
      });
  },
});
export const { reducer } = PlaylistModalModel;
