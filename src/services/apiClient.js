import ToastEmitter from "../components/shared/lib/ToastEmitter";
import { BASE_URL } from "../constants/API";
import { ACCESS_TOKEN_KEY } from "../constants/token";
import token from "../utils/token";
import axios from "axios";
const host = BASE_URL;
const apiClient = axios.create({
  baseURL: host,
});
const logOnDev = (message, log) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, log);
  }
};

apiClient.interceptors.request.use((request) => {
  const jwtToken = token.getToken(ACCESS_TOKEN_KEY);
  const { method, url } = request;

  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  logOnDev(`🚀 [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;
    logOnDev(
      `✨ [${method?.toUpperCase()}] ${url} | Response ${status}`,
      response,
    );
    return response;
  },
  (error) => {
    const { message } = error;
    const { status, data } = error.response || {};
    const { method, url } = error.config;

    if (error.code === 'ECONNABORTED') {
      // Timeout error handling
      ToastEmitter.error("Request timed out. Please try again.");
    } else {
      logOnDev(
        `🚨 [${method?.toUpperCase()}] ${url} | Error ${status} ${data?.message || ""} | ${message}`,
        error,
      );
      process.env.NODE_ENV === "development" && ToastEmitter.error(`${data?.title + " || " || ""} ${data?.message || ""} ${message}`);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
