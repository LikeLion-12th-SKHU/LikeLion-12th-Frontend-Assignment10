// src/components/PostList.js
import React from "react";
import instance from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";

const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6;
  const end = start + 6;
  const response = await instance.get(`/posts?start=${start}&end=${end}`);
  return response.data;
};

const PostList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => fetchPosts({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.posts.length < 6 ? undefined : nextPage;
    }
  });

  return (
    <Container>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.posts.map((post, index) => (
                <Post key={index}>
                  <h2>{post.title}</h2>
                  <p>{post.date}</p>
                </Post>
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "더 불러오기"}
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Post = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    margin: 0 0 10px;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: #555;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;

export default PostList;
