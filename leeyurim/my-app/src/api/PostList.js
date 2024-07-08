import React from "react";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import styled from "styled-components";
import axiosInstance from "../api/axiosInstance";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: lightgray;
  border-radius: 10px;
`;
const PostItem = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  border-radius: 10px;
`;
const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fbf2ef;
  }
`;

const PostList = () => {
  // 쿼리 클라이언트 인스턴스 생성
  const queryClient = new QueryClient();

  // useInfiniteQuery 훅을 사용하여 무한 스크롤 기능을 구현
  const {
    data, // 쿼리 결과 데이터
    fetchNextPage, // 다음 페이지 데이터를 가져오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetching, // 데이터를 가져오는 중인지 여부
    isFetchingNextPage, // 다음 페이지 데이터를 가져오는 중인지 여부
  } = useInfiniteQuery({
    queryKey: "posts", // 쿼리 키
    queryFn: ({ pageParam = 0 }) => {
      const start = pageParam * 6; // 시작 인덱스 계산
      const end = start + 6; // 끝 인덱스 계산
      return axiosInstance // axiosInstance를 사용하여 데이터 가져오기
        .get(`/posts?start=${start}&end=${end}`)
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage, allPages) => lastPage.page + 1, // 다음 페이지 파라미터 계산
    client: queryClient, // 쿼리 클라이언트 설정
  });

  // 데이터 로딩 중이거나 데이터가 없는 경우 처리
  if (isFetching || !data) return <p>Loading...</p>;

  // data.pages가 없는 경우 처리
  if (!data.pages) return null;

  return (
    <Container>
      {/* 각 페이지별 포스트 아이템 렌더링 */}
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.posts.map((post) => (
            <PostItem key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <p>{post.date}</p>
              <img src={post.image} alt={post.title} />
            </PostItem>
          ))}
        </React.Fragment>
      ))}

      {/* 다음 페이지 데이터를 가져오는 중이면 로딩 표시 */}
      {isFetchingNextPage && <p>Loading more...</p>}

      {/* 다음 페이지가 있으면 더 불러오기 버튼 렌더링 */}
      {hasNextPage && (
        <LoadMoreButton
          onClick={() => fetchNextPage()} // 클릭 시 다음 페이지 데이터 가져오기
          disabled={isFetchingNextPage} // 데이터를 가져오는 중일 때 버튼 비활성화
        >
          {isFetchingNextPage ? "로딩 중..." : "더 불러오기"}
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default PostList;
