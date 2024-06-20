import axiosClient from "./axiosClient";

const URL = "/auth";
export const authApi = {
  login(body) {
    return axiosClient.post(URL + "/login", body);
  },
  logout() {
    return axiosClient.post(URL + "/logout");
  },
  register(body) {
    return axiosClient.post(URL + "/register", body);
  },
};
