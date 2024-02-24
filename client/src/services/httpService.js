import axios from "axios";

import { getLocalAccessToken } from "./utils";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = async ({ method, url, data, headers }) => {
  if (method === "delete") {
    data = { data };
  }

  const promise = instance[method](url, data, headers);

  try {
    const response = await promise;
    console.log("response", response);
    const payload = response.data;

    if (headers) {
      return { data: payload, headers: response.headers };
    }
    return payload;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};

export default instance;

export const get = (url, params) => request({ method: "get", url, ...params });

export const post = (url, data, params) =>
  request({ method: "post", url, data, ...params });

export const put = (url, data, params) =>
  request({ method: "put", url, data, ...params });

export const del = (url, data) => request({ method: "delete", url, data });
