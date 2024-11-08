import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Your backend's base URL
});

// const setupAxiosInterceptors = (token) => {
axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('jwtToken');
    // console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // (config) => {
  //     const token = localStorage.getItem('token'); // You can store token in localStorage or context
  //     if (token) {
  //         config.headers['Authorization'] = 'Bearer ' + token;
  //     }
  //     return config;
  // },
  (error) => {
    return Promise.reject(error);
  }
);
// };

// export default setupAxiosInterceptors;
export default axiosInstance;
