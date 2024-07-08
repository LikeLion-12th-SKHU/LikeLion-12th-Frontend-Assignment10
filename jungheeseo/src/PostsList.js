import React from "react";
import { useInfiniteQuery } from "react-query";
import instance from "./axiosInstance";
import {
  Loading,
  Container,
  Button,
  PostContainer,
  Title,
  Date,
} from "./PostsListStyles";

// API 호출 함수
const fetchPosts = async ({ pageParam }) => {
  const start = pageParam * 6; // 페이지 시작 인덱스
  const end = start + 6; // 페이지 끝 인덱스
  const response = await instance.get(`/posts?start=${start}&end=${end}`); // instance를 사용해서 API 호출
  return response.data; // API에서 데이터 부분만 반환
};

const PostsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    "posts", // 고유 키 지정
    ({ pageParam }) => fetchPosts({ pageParam }), //API 호출 함수를 전달
    {
      getNextPageParam: (lastPage, pages) => {
        // 다음 페이지 인덱스를 계산하는 함수 정의
        const currentFetchCount = pages.reduce(
          (count, page) => count + page.posts.length,
          0
        );
        // 다음 페이지를 불러올 수 있는지 판단
        return currentFetchCount < 6 ? undefined : pages.length;
      },
    }
  );

  // 데이터가 없을 경우 로딩 메세지 표시
  if (!data) return <Loading>Loading...</Loading>;

  // 데이터를 렌더링
  return (
    <Container>
      {/* 데이터의 각 페이지를 순회 */}
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {/* 페이지를 순회하여 렌더링 */}
          {page.posts.map((post, index) => (
            <PostContainer key={index}>
              <Title>{post.title}</Title>
              <Date>{post.date}</Date>
            </PostContainer>
          ))}
        </React.Fragment>
      ))}
      {/* 다음 페이지가 존재하면 버튼을 표시 */}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetching}>
          {isFetching ? "로딩중" : "더 불러오기"}
        </Button>
      )}
    </Container>
  );
};

export default PostsList;
