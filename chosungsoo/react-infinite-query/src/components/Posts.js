// src/components/Posts.js
import React from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

// fetchPosts 함수는 주어진 pageParam에 따라 게시물 데이터를 가져옵니다.
const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6; // 시작 인덱스를 계산합니다.
  const end = start + 6; // 끝 인덱스를 계산합니다.
  const response = await axiosInstance.get(`/posts?start=${start}&end=${end}`); // 해당 범위의 게시물을 가져옵니다.
  return response.data; // 데이터를 반환합니다.
};

// Posts 컴포넌트는 게시물 목록을 렌더링합니다.
const Posts = () => {
  // useInfiniteQuery 훅을 사용하여 데이터를 가져오고, 관련 상태와 메서드를 반환받습니다.
  const {
    data, // 가져온 데이터
    error, // 에러 객체
    fetchNextPage, // 다음 페이지를 가져오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetching, // 데이터를 가져오는 중인지 여부
    isFetchingNextPage, // 다음 페이지를 가져오는 중인지 여부
    status, // 현재 상태 (로딩, 성공, 에러 등)
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts, // 데이터를 가져오는 함수입니다.
    getNextPageParam: (lastPage, pages) => {
      // 다음 페이지의 파라미터를 설정하는 함수입니다.
      if (lastPage.posts.length === 6) {
        // 마지막 페이지에 게시물이 6개 있는 경우
        return pages.length; // 다음 페이지 번호를 반환합니다.
      } else {
        return undefined; // 더 이상 페이지가 없으면 undefined를 반환합니다.
      }
    },
  });

  // 로딩 중일 때 로딩 스피너를 보여줍니다.
  if (status === "loading") return <Spinner>Loading...</Spinner>;
  // 에러가 발생했을 때 에러 메시지를 보여줍니다.
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div>
      <Title>Infinite Query Example</Title>
      {/* 데이터가 있는 경우 페이지별로 데이터를 렌더링합니다. */}
      {data?.pages?.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
            <PostCard key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </PostCard>
          ))}
        </React.Fragment>
      ))}
      <div>
        {/* "더 불러오기" 버튼을 렌더링합니다. */}
        <LoadMoreButton
          onClick={() => fetchNextPage()} // 클릭 시 다음 페이지를 가져옵니다.
          disabled={!hasNextPage || isFetchingNextPage} // 다음 페이지가 없거나 데이터를 가져오는 중이면 버튼을 비활성화합니다.
        >
          {isFetchingNextPage
            ? "데이터를 불러오는 중.."
            : hasNextPage
            ? "더 불러오기"
            : "더 이상 없어요."}{" "}
        </LoadMoreButton>
      </div>
      {/* 데이터를 가져오는 중일 때 메시지를 표시합니다. */}
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

// 제목 스타일링
const Title = styled.h1`
  text-align: center;
`;

// 로딩 스피너 스타일링
const Spinner = styled.div`
  text-align: center;
  font-size: 24px;
`;

// 게시물 카드 스타일링
const PostCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  width: 80%;
  margin: 10px auto;
`;

// "더 불러오기" 버튼 스타일링
const LoadMoreButton = styled.button`
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  font-size: 16px;
  cursor: pointer;
`;

export default Posts; // Posts 컴포넌트를 기본 내보내기로 설정합니다.
