import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  timeout: 20000,
});

const request = {
  get: (url, settings) => {
    return api.get(url, settings);
  },
  post: (url, data, token) => {
    if (token) {
      return api.post(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }
    return api.post(url, data);
  },
  patch: (url, data, token) => {
    return api.patch(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  delete: (url, token) => {
    return api.delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default request;
