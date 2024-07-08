import axios from "axios";

const instance = axios.create({
  baseURL: "/", // baseURL을 상대 경로로 설정
});

export default instance;
