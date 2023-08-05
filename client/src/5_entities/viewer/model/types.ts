import { User } from '@shared/lib';
import { ITrack } from '@shared/types';

export enum AccountActionTypes {
  AUTHORIZATION = 'AUTHORIZATION',
  LOGOUT = 'LOGOUT',
  REFRESH = 'REFRESH',
  LOADING = 'LOADING',
  UPDATE = 'UPDATE',
  CHANGE_ROUTE = 'CHANGE_ROUTE',
  ADD_TRACK = 'ADD_TRACK',
  REMOVE_TRACK = 'REMOVE_TRACK',
  FETCH_USER_MUSIC = 'FETCH_USER_MUSIC',
  SEARCH_USER_TRACKS = 'SEARCH_USER_TRACKS',
}

export type AccountState = {
  refreshToken: string;
  accessToken: string;
  user: User;
  isLoading: boolean;
  search_userTracks: ITrack[];
  isSearching: boolean;
  isAuth: boolean;
  userTracks: ITrack[];
  isHidrated: boolean;
};

export interface IRegistrationData {
  firstname: string;
  surname: string;
  email: string;
  password: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
export interface IUpdateData {
  email: string;
  firstname: string;
  surname: string;
}
