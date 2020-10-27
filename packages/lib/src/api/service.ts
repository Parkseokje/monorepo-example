import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

const onSuccess = (res: AxiosResponse) => {
  return res.data;
};

const onError = (err: AxiosError) => {
  console.error("Request Failed:", err.config);
  if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
    console.error("Headers:", err.response.headers);
  } else {
    console.error("Error message:", err.message);
  }
  return Promise.reject(err.response || err.message);
};

export const get = (url: string, params?: AxiosRequestConfig) => {
  return axios
    .get(BASE_URL + url, {
      params,
    })
    .then(onSuccess)
    .catch(onError);
};

export const post = (url: string, data: object) => {
  return axios
    .post(BASE_URL + url, data)
    .then(onSuccess)
    .catch(onError);
};
