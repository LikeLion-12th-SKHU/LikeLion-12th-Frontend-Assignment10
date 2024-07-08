import axiosInstance from "./axiosInstance";

export const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6; // 시작 인덱스 계산
  const end = start + 6; // 끝 인덱스 계산

  try {
    // axiosInstance를 사용하여 서버로부터 데이터 가져오기
    const response = await axiosInstance.get(
      `/posts?start=${start}&end=${end}`
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    // 오류 발생 시 에러 처리
    console.error("Error fetching posts:", error);
    throw error; // 오류를 호출자에게 다시 던지기
  }
};
