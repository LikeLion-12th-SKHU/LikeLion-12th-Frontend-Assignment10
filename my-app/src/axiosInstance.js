import axios from "axios"; // Axios 불러오기

// Axios 인스턴스 생성
const instance = axios.create({
  // 기본 URL 경로 설정
  baseURL: "/",
});

// Axios 인스턴스 내보내기
export default instance;
