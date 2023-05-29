import { createAsyncThunk } from "@reduxjs/toolkit";
import { TrackService } from "@shared/api/services";
import { Toast } from "@shared/components";
import { IPaginationParams, ISearchRequest, ITrack, TrackActionTypes } from "@shared/types";

export const fetchTracks = createAsyncThunk<ITrack[], IPaginationParams, { rejectValue: ITrack[] }>(TrackActionTypes.FETCH_TRACKS, async (params, ta) => {
  try {
    const { data } = await TrackService.fetchTracksReq(params);
    return data;
  } catch (error) {
    console.error("fetchTracks ERROR: ", error);
    //вот тут может быть и неправильно сделано, надо еще обработку ошибков в редьюдере сделать
    ta.rejectWithValue([]);
  }
});
export const searchTracks = createAsyncThunk<ITrack[], ISearchRequest, { rejectValue: ITrack[] }>(TrackActionTypes.SEARCH_TRACKS, async (payload, ta) => {
  try {
    if (!payload.query.length) return [];

    const { data } = await TrackService.searchTracksReq(payload);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("searchTracks ERROR: ", error);
    new Toast({ type: "error", message: "Произошла ошибка при поиске треков" });
    ta.rejectWithValue([]);
  }
});
