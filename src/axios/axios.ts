import axios from "axios";
import { store } from "../redux/store";
import { clearUser, setAccessToken } from "../redux/userSlice";

export default axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosPrivate.get("/refresh");
        const newAccessToken = response.data.accessToken;

        store.dispatch(setAccessToken(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
