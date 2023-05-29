import { baseURL } from "@shared/const";
export const generateUrl = (url: string = "") => {
  return baseURL + url;
};
