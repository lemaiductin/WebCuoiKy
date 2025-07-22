import axios from "axios";
const baseURL = import.meta.env.VITE_API_SERVICE;

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  withCredentials: true,
});
instance.defaults.withCredentials = true;

// Add a request interceptori
instance.interceptors.request.use(
  function (config) {
    // Lấy token từ localStorage hoặc sessionStorage
    const token = localStorage.getItem("token"); // Hoặc sessionStorage.getItem("token")

    // Nếu có token thì thêm vào header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
});

export default instance;
