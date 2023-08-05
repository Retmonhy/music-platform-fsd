import { IDefaultParams, IDefaultResponse, IId, ITrack, IUser } from '@shared/types';

import { IUpdateData } from '../model';

export enum AccountEndpoints {
  // /account
  LOGIN = '/account/login',
  LOGOUT = '/account/logout',
  REFRESH = '/account/refresh',
  REGISTRATION = '/account/registration',
  UPDATE = '/account/update',
  //tracks
  FETCH_USER_MUSIC = '/account/music',
  ADD_TRACK = '/account/music/add',
  REMOVE_TRACK = '/account/music/remove',
  //playlists
  ADD_PLAYLIST_TO_USER = '/account/playlists/add',
  REMOVE_PLAYLIST_FROM_USER = '/account/playlists/remove',
}

export interface ILoginUserResponse extends IDefaultResponse {
  isSuccess: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export type IUpdateProfileRequest = {
  payload: IUpdateData;
} & IDefaultParams;

export interface IUpdateProfileResponse extends IDefaultResponse {
  user: IUser;
}

export interface IAddTrackResponce extends IDefaultResponse {
  track: ITrack;
}
export interface IRemoveTrackResponse extends IDefaultResponse, IId {}
