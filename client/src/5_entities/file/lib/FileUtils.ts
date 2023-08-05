import { FileService } from '../api';
import { UploadActionType } from '../model';

export class FileUtils {
  static UploadFile(actionType: UploadActionType, file: File) {
    return FileService.upload(actionType, file);
  }
}
