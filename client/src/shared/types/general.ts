export interface IDefaultResponse {
  isSuccess: boolean;
  message?: string;
}
export interface IDefaultParams {
  accessToken: string;
}
export interface IPaginationParams {
  pageSize: number;
  page: number;
}
