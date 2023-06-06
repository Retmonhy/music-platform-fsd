import { api } from "@shared/api";
import { IPaginationParams, ITrack } from "@shared/types";
import { ICreateTrackResponse, IDeleteTrackResponse, ISearchTrackRequest, TrackEndpoints } from "./types";

export class TrackService {
  static fetchTracksReq = (params: IPaginationParams) => {
    return api.get<ITrack[]>(TrackEndpoints.TRACKS, { params });
  };
  static createTrack = (payload) => {
    return api.post<ICreateTrackResponse>(TrackEndpoints.CREATE_TRACK, payload);
  };
  static deleteTrackReq = (trackId: string) => {
    return api.delete<IDeleteTrackResponse>(`/tracks/${trackId}`);
  };
  static searchTracksReq = (payload: ISearchTrackRequest) => {
    return api.get<ITrack[]>(TrackEndpoints.SEARCH, { params: { ...payload } });
  };
}
