import { api } from "..";
import { IDefaultResponse, IPaginationParams, ITrack } from "@shared/types";
import { TrackEndpoints } from "../endpoints";
interface ICreateTrackResponse extends IDefaultResponse {
  track: ITrack;
}
interface IDeleteTrackResponse extends IDefaultResponse {
  trackId: string;
}
export interface ISearchRequest {
  query: string;
  owner_id?: string;
}
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
