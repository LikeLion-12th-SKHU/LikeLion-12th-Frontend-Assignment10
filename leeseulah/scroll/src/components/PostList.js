import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";

const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6;
  const end = start + 6;
  const response = await axios.get(
    `https://hj-devlog.vercel.app/api/posts?start=${start}&end=${end}`
  );
  return response.data;
};

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("posts", fetchPosts, {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage < 5 ? nextPage : undefined;
      },
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
              {isFetchingNextPage ? "Loading more..." : "Load More"}
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
`;

const Post = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-top: 10px;
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
`;

export default PostList;
