import axiosClient from "./axiosClient";

const URL = "/room";
export const roomApi = {
  getAllRoom() {
    return axiosClient.get(URL);
  },
  getRoomById(id) {
    return axiosClient.get(URL + "/" + id);
  },
  getPrivateRoomWithUserId(id) {
    return axiosClient.get(URL + "/get-room-private/" + id);
  },
};
