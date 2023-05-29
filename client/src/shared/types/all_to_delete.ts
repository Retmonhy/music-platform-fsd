import { IComment, ITrack } from "../types";
export interface IDefaultResponse {
  isSuccess: boolean;
  message?: string;
}
export interface IDefaultParams {
  accessToken: string;
}
export interface ICommentResponse extends IDefaultResponse {
  comment: IComment;
}
export interface ICreateTrackResponse extends IDefaultResponse {
  track: ITrack;
}
export interface IDeleteTrackResponse extends IDefaultResponse {
  trackId: string;
}
export interface ITrackRequest {
  id: string; //id добавляемого трека
}
export interface ISearchRequest {
  query: string;
  owner_id?: string;
}
export interface IAddTrackResponce extends IDefaultResponse {
  track: ITrack;
}
export interface IRemoveTrackResponse extends IDefaultResponse {
  id: string;
}

export interface IUploadResponse {
  path: string;
}

export interface IPaginationParams {
  pageSize: number;
  page: number;
}
