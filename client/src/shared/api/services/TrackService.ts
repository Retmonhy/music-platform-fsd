import { api } from "..";
import { ICreateTrackResponse, IDeleteTrackResponse, IPaginationParams, ISearchRequest, ITrack } from "@shared/types";
import { TrackEndpoints } from "../endpoints";
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
  static searchTracksReq = (payload: ISearchRequest) => {
    return api.get<ITrack[]>(TrackEndpoints.SEARCH, { params: { ...payload } });
  };
}
