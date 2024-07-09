import axiosClient from "./axiosClient";

const URL = "/user";
export const userApi = {
  update(body) {
    return axiosClient.put(URL + "/update", body);
  },
  changePassword(body) {
    return axiosClient.put(URL + "/change-password", body);
  },
  getListAddFriendRequests({ offset, limit }) {
    return axiosClient.get(
      URL + "/get-list-add-friend-requests?offset=" + offset ||
        0 + "&limit=" + limit ||
        10
    );
  },
  sendAddFriendRequest(body) {
    return axiosClient.post(URL + "/send-request-add-friend", body);
  },
  acceptAddFriendRequest(body) {
    return axiosClient.put(URL + "/accept-request-add-friend", body);
  },
  rejectAddFriendRequest(body) {
    return axiosClient.put(URL + "/accept-request-add-friend", body);
  },
};
