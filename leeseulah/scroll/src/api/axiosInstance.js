import axios from "axios";

const instance = axios.create({
  baseURL: "https://hj-devlog.vercel.app/api",
});

export default instance;
