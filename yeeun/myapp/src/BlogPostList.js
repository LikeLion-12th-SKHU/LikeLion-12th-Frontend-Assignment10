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
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetchingNextPage, // 다음 페이지를 가져오는 중인지 여부
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"], // 쿼리의 키 배열
    queryFn: fetchPosts, // 데이터를 가져오는 비동기 함수
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지의 매개변수를 계산하는 함수
      if (lastPage.posts.length === 6) {
        return allPages.length + 1; // 마지막 페이지에서 6개의 포스트를 반환했을 때 다음 페이지의 인덱스를 반환
      } else {
        return undefined; // 더 이상 페이지가 없음
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
        onClick={() => fetchNextPage()} // 다음 페이지를 가져오는 함수 호출
        disabled={!hasNextPage || isFetchingNextPage}>
        {" "}
        {getMorePostBtnText()}{" "}
      </S.MorePostBtn>{" "}
    </S.BlogContainer>
  );
};

export default PostList;
