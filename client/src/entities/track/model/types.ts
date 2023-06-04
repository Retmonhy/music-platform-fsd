import { ITrack } from "@shared/types";

export interface ITrackState {
  tracks: ITrack[];
  isLoading: boolean;

  searchedTracks: ITrack[];
  isSearching: boolean;
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  DELETE_TRACK = "DELETE_TRACK",
  SEARCH_TRACKS = "SEARCH_TRACKS",
}
