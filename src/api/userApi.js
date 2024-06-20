import axiosClient from "./axiosClient";

const URL = "/user";
export const userApi = {
  update(body) {
    return axiosClient.put(URL + "/update", body);
  },
  changePassword(body) {
    return axiosClient.put(URL + "/change-password", body);
  },
};
