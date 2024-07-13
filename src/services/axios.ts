import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '/api/',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
