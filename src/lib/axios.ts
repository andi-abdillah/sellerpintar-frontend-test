import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://test-fe.mysellerpintar.com/api/",
});
