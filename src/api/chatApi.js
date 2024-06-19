import axiosClient from "./axiosClient";

const URL = "/chat";
export const chatApi = {
  chat(body) {
    return axiosClient.post(URL, body);
  },
};
