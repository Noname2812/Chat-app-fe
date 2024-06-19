import axiosClient from "./axiosClient";

const URL = "/auth";
export const authApi = {
  login(body) {
    return axiosClient.post(URL + "/login", body);
  },
};