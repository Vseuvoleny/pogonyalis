import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BE_URL || "http://localhost:3333/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Здесь позже можно реализовать refresh token / logout
      }
    }

    return Promise.reject(error);
  },
);
