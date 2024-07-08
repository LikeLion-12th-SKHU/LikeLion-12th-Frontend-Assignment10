import React from "react";
import * as S from "./BlogPostList.Style";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "./queryFn";
import { ClipLoader } from "react-spinners";

const PostList = () => {
  const {
    data,
    fetchNextPage,
    error,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.posts.length === 6) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (status === "loading") {
    return <ClipLoader />;
  }
  if (status === "error") {
    return <div> 에러: {error.message} </div>;
  }
  if (!data) {
    return <div> 데이터 없음 </div>;
  }

  const getMorePostBtnText = () => {
    if (isFetchingNextPage) {
      return <ClipLoader />;
    } else if (hasNextPage) {
      return "더 불러오기";
    } else {
      return "끝";
    }
  };

  return (
    <S.BlogContainer>
      {" "}
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {" "}
          {page.posts.map((post) => (
            <S.BlogPosts key={post.slug}>
              <S.BlogTitle> {post.title} </S.BlogTitle>{" "}
              <S.BlogDate> {post.date} </S.BlogDate>{" "}
            </S.BlogPosts>
          ))}{" "}
        </React.Fragment>
      ))}{" "}
      <S.MorePostBtn
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}>
        {" "}
        {getMorePostBtnText()}{" "}
      </S.MorePostBtn>{" "}
    </S.BlogContainer>
  );
};

export default PostList;
