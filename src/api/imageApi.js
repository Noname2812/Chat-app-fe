import axiosClient from "./axiosClient";

const URL = "/photo";
export const imageApi = {
  uploadImg(body) {
    return axiosClient.post(URL + "up-load-photo", body);
  },
};
