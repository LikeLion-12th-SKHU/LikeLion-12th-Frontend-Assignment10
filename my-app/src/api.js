import instance from "./axiosInstance"; // instance 불러오기

// fetchPosts 함수 비동기 설정 및 내보내기
export const fetchPosts = async ({ pageParam = 0 }) => {
  // 시작 인덱스는 한 번에 로드할 게시물의 개수
  const start = pageParam * 6;
  // 끝 인덱스는 시작 인덱스에 6을 더한 값
  const end = start + 6;
  // Axios 인스턴스를 사용하여 GET 요청 보내기 (쿼리 매개변수로 start, end 전달)
  const response = await instance.get(`/posts?start=${start}&end=${end}`);
  // 요청에 대한 응답 데이터 반환
  return response.data;
};
