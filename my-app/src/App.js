import React, { useRef, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import styled from "styled-components";
import { fetchPosts } from "./api"; // fetchPosts 함수를 "./api"에서 가져옴

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const App = () => {
  return (
    // QueryClientProvider로 queryClient를 전달하여 전역적인 상태 관리 설정
    <QueryClientProvider client={queryClient}>
      {/* PostList 컴포넌트 렌더링 */}
      <PostList />
    </QueryClientProvider>
  );
};

const PostList = () => {
  // useInfiniteQuery 훅을 사용하여 게시물 데이터를 불러오는 상태 관리
  const {
    data, // 현재 불러온 데이터
    fetchNextPage, // 다음 페이지 데이터를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetching, // 현재 데이터를 가져오는 중인지 여부
    isFetchingNextPage, // 다음 페이지 데이터를 가져오는 중인지 여부
    status, // 데이터 요청 상태 ("loading", "error", "success")
  } = useInfiniteQuery({
    queryKey: ["posts"], // 쿼리 키 설정 - 여기서는 "posts"라는 배열로 설정
    queryFn: fetchPosts, // 데이터를 가져오는 함수로 fetchPosts를 사용
    getNextPageParam: (lastPage, pages) => {
      // getNextPageParam 함수를 통해 다음 페이지의 매개변수 설정
      if (lastPage.posts.length === 6) {
        return pages.length; // 현재 페이지 번호를 반환하여 다음 페이지 설정
      } else {
        return undefined; // 더 이상 다음 페이지가 없음을 의미
      }
    },
  });

  // Intersection Observer를 사용하여 스크롤 이벤트를 감지하는 useRef 훅을 생성
  const observerElem = useRef();

  // useEffect를 사용하여 Intersection Observer를 설정하고 해제
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage(); // Intersection Observer가 화면에 나타나면 다음 페이지를 불러옴
      }
    });

    if (observerElem.current) {
      observer.observe(observerElem.current); // observerElem을 관찰 대상으로 설정
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current); // 컴포넌트가 언마운트될 때 Intersection Observer 해제
      }
    };
  }, [hasNextPage, fetchNextPage]); // hasNextPage와 fetchNextPage가 변경될 때 useEffect 재실행

  // 데이터 로딩 중일 때 "Loading..." 텍스트를 반환
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // 데이터 요청 중 오류가 발생했을 때 "Error loading posts" 텍스트 반환
  if (status === "error") {
    return <p>Error loading posts</p>;
  }

  // 데이터가 없을 경우 아무것도 렌더링하지 않음
  if (!data) {
    return null;
  }
};
export default App;
