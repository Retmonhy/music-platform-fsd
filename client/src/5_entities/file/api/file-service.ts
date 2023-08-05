import { api } from '@shared/api';

import { UploadActionType } from '../model';
import { FileEndpoints, IUploadResponse } from './types';

export class FileService {
  static upload(act: UploadActionType, file: File) {
    const form = new FormData();
    form.append('file', file);
    return api.post<IUploadResponse>(FileEndpoints.UPLOAD, form, {
      params: { act },
    });
  }
}
