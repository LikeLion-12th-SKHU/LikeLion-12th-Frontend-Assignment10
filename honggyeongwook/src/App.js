import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axiosInstance from "./axios";
import styled from "styled-components";

// 쿼리 관리를 위한 QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 페이지 매개변수를 기반으로 게시물을 가져오는 함수 정의
const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6; // 시작 인덱스 계산
  const end = start + 6; // 끝 인덱스 계산
  const response = await axiosInstance.get(`/posts?start=${start}&end=${end}`); // API에서 게시물 가져오기
  return response.data; // 응답 데이터 반환
};

// 앱 컴포넌트는 나머지 앱에 쿼리 클라이언트를 제공합니다
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
};

// 게시물 가져오기 및 표시를 처리하는 Posts 컴포넌트
const Posts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"], // 쿼리의 고유 키
    queryFn: fetchPosts, // 게시물을 가져오는 함수
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.posts.length === 6) {
        return pages.length; // 더 많은 게시물이 있으면 다음 페이지 번호 반환
      } else {
        return undefined; // 더 이상 페이지가 없으면 undefined 반환
      }
    },
  });

  // 데이터를 가져오는 동안 로딩 메시지 표시
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // 데이터를 가져오는 중 오류가 발생하면 오류 메시지 표시
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  // 게시물 및 더 불러오기 버튼 렌더링
  return (
    <Container>
      {/* 페이지 및 게시물을 순회하여 표시 */}
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
            <Post key={post.slug}>
              <Title>{post.title}</Title>
              <Date>{post.date}</Date>
            </Post>
          ))}
        </React.Fragment>
      ))}
      {/* 다음 페이지를 가져오기 위한 더 불러오기 버튼 */}
      <LoadMoreButton
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..." // 다음 페이지를 가져오는 중일 때 로딩 메시지 표시
          : hasNextPage
          ? "Load More" // 더 많은 페이지가 있으면 더 불러오기 버튼 표시
          : "Nothing more to load"}{" "}
        {/* // 더 이상 로드할 항목이 없으면 메시지 표시 */}
      </LoadMoreButton>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>{" "}
      {/* 데이터 가져오는 중 메시지 표시 */}
    </Container>
  );
};

// UI 스타일링을 위한 styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  width: 300px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
`;

const Date = styled.p`
  font-size: 0.8em;
  color: #888;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  margin: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #aaa;
  }
`;

export default App; // App 컴포넌트를 기본 내보내기로 내보냅니다
