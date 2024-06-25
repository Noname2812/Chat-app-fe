import axiosClient from "./axiosClient";

const URL = "/room";
export const roomApi = {
  getAllRoom() {
    return axiosClient.get(URL);
  },
  getRoomById({ id, offset, limit }) {
    return axiosClient.get(
      URL + "/" + id + `?offset=${offset || 0}&limit=${limit || 10}`
    );
  },
  getPrivateRoomWithUserId(id) {
    return axiosClient.get(URL + "/get-room-private/" + id);
  },
};
