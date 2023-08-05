import axios from 'axios';

import { api } from '@shared/api';
import { generateUrl } from '@shared/lib';
import { IId, ITrack } from '@shared/types';

import { ILoginData, IRegistrationData } from '../model';
import { AccountEndpoints, IAddTrackResponce, ILoginUserResponse, IRemoveTrackResponse, IUpdateProfileRequest, IUpdateProfileResponse } from './types';

export class AccountService {
  static login = async (payload: ILoginData) => {
    return api.post<ILoginUserResponse>(AccountEndpoints.LOGIN, payload, {});
  };
  static registration = async (payload: IRegistrationData) => {
    return api.post<ILoginUserResponse>(AccountEndpoints.REGISTRATION, payload);
  };
  static logout = async () => {
    return api.post(AccountEndpoints.LOGOUT);
  };
  static updateProfile = async ({ payload, ...params }: IUpdateProfileRequest) => {
    return api.post<IUpdateProfileResponse>(AccountEndpoints.UPDATE, payload, {
      params,
    });
  };
  static checkAuth = async () => {
    return axios.get<ILoginUserResponse>(generateUrl(AccountEndpoints.REFRESH), {
      withCredentials: true,
    });
  };
  static addTrack = async (params: IId) => {
    return api.get<IAddTrackResponce>(AccountEndpoints.ADD_TRACK, {
      params,
    });
  };
  static removeTrack = async (params: IId) => {
    return api.delete<IRemoveTrackResponse>(AccountEndpoints.REMOVE_TRACK, {
      params,
    });
  };
  static fetchUserMusic = async () => {
    return api.get<ITrack[]>(AccountEndpoints.FETCH_USER_MUSIC);
  };
}
