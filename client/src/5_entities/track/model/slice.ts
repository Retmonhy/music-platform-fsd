import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { isFulfilledAction, isPendingAction, isRejectedAction } from '@shared/lib';
import { ITrack } from '@shared/types';

import { fetchTracks, searchTracks } from './actions';
import { ITrackState, TrackActionTypes } from './types';

const initialState: ITrackState = {
  tracks: [],
  isLoading: false,

  searchedTracks: [],
  isSearching: false,
  error: '',
};

function validateActionType(actionType: string) {
  const condition = actionType.startsWith(TrackActionTypes.FETCH_TRACKS) || actionType.startsWith(TrackActionTypes.DELETE_TRACK);
  return condition ? true : false;
}
function loadingFalse(state, action) {
  if (validateActionType(action.type)) {
    state.isLoading = false;
  }
}
function loadingTrue(state, action) {
  if (validateActionType(action.type)) {
    state.isLoading = true;
  }
}
function searchingTrue(state, action) {
  if (action.type.startsWith(TrackActionTypes.SEARCH_TRACKS)) {
    state.isSearching = true;
  }
}
function searchingFalse(state, action) {
  if (action.type.startsWith(TrackActionTypes.SEARCH_TRACKS)) {
    state.isSearching = false;
  }
}
function isTrackPendingAction(action: AnyAction) {
  return validateActionType(action.type) && isPendingAction(action);
}
function isTrackFullfiledAction(action: AnyAction) {
  return validateActionType(action.type) && isFulfilledAction(action);
}
function isTrackRejectedAction(action: AnyAction) {
  return validateActionType(action.type) && isPendingAction(action);
}

export const TrackModel = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTracks.fulfilled, (state, action) => {
        state.searchedTracks = action.payload;
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
        state.tracks = [...state.tracks, ...action.payload];
      })
      .addMatcher(isTrackPendingAction, loadingTrue)
      .addMatcher(isPendingAction, searchingTrue)
      //для всех промисов, которые разрешились успехом
      .addMatcher(isTrackFullfiledAction, loadingFalse)
      .addMatcher(isFulfilledAction, searchingFalse)
      //для всех промисов, которые выдают ошибку
      .addMatcher(isTrackRejectedAction, loadingFalse)
      .addMatcher(isRejectedAction, searchingFalse)
      .addDefaultCase((store) => store);
  },
});

export const { reducer } = TrackModel;
