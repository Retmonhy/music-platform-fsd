import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,

  userTracks: [],
  search_userTracks: [],
  isSearching: false,

  isHidrated: true,
};

export const viewerModel = createSlice({
  name: 'viewer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export const { reducer } = viewerModel;
