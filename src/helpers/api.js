import axios from "axios";

export default function requestApi(
  endpoint,
  method,
  body,
  responseType = "json"
) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const instance = axios.create({ headers });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance.request({
    method: method,
    url: `${import.meta.env.VITE_USER_SERVICE_SERVER}/${endpoint}`,
    data: body,
    responseType: responseType,
  });
}
