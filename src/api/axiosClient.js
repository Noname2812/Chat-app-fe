import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store";
import { logout, setNewToken } from "../redux/reducers/authReducers";
import dayjs from "dayjs";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
  timeout: 300000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { user } = store.getState().auth;
    if (user) {
      const decodedToken = jwtDecode(user.token);
      const currentTime = dayjs();
      if (dayjs.unix(decodedToken.exp) < currentTime) {
        // get new token
        try {
          const data = await refreshToken({
            accessToken: user.token,
            refreshToken: user.refreshToken,
          });
          config.headers["Authorization"] = `Bearer ${data.accessToken}`;
          store.dispatch(
            setNewToken({
              token: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch (error) {
          store.dispatch(logout());
        }
      } else {
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const refreshToken = async ({ accessToken, refreshToken }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};
export default axiosClient;
