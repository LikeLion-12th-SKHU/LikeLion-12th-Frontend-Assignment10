import React from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import fetchPosts from "../api/fetchPosts";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PostCard = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 20px 0;
`;

const PostsList = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length * 6;
      return nextPage;
    },
  });

  if (isLoading && !data) {
    return (
      <Container>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p>게시물을 불러오는 중 오류가 발생했습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((post) => (
            <PostCard key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </PostCard>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "로딩 중..." : "더 불러오기"}
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default PostsList;
