import { IDefaultResponse, ITrack } from "@shared/types";

export enum TrackEndpoints {
  TRACKS = "/tracks",
  CREATE_TRACK = "/tracks/create",
  SEARCH = "/tracks/search",
  POST_COMMENT = "/tracks/comment",
}

export interface ICreateTrackResponse extends IDefaultResponse {
  track: ITrack;
}
export interface IDeleteTrackResponse extends IDefaultResponse {
  trackId: string;
}
export interface ISearchTrackRequest {
  query: string;
  owner_id?: string;
}
