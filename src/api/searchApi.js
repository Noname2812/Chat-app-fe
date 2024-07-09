import axiosClient from "./axiosClient";

const URL = "/search";
export const searchApi = {
  search({ searchValue, offset, limit }) {
    return axiosClient.get(
      URL + "/" + searchValue + `?offset=${offset || 0}&limit=${limit || 10}`
    );
  },
};
