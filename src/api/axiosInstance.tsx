import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dragonball-api.com/api/characters/",
  timeout: 10000,
});

export default axiosInstance;
