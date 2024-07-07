import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../service/request";
import styled from "styled-components";

const DivStyled = styled.div`
  text-align: center;
`;
const ItemStyled = styled.div`
  margin: 10px;
  padding: 10px;
`;
function Projects() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"], // 쿼리 키를 projects라는 고유 키로 설정
    queryFn: fetchPosts, // 데이터를 가져오는 함수로 fetchPosts를 사용
    initialPageParam: 0, // 초기 페이지의 매개변수를 0으로 설정

    // 현재 페이지 번호에 따라 다음 페이지 번호를 반환하거나 더 이상 페이지가 없음을 반환함
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.posts.length === 6) {
        return pages.length;
      } else {
        return undefined; // 더 이상 다음 페이지가 없음
      }
    },
  });

  if (status === "loading") return <p>로딩중...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;
  if (!data) return <p>표시할 데이터가 없습니다.</p>; // 데이터가 없는 경우 처리

  return (
    <DivStyled>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.posts.map((post, j) => (
            <ItemStyled key={j}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
            </ItemStyled>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "불러오는중..."
            : hasNextPage
            ? "더보기"
            : "더이상 데이터가 없습니다."}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </DivStyled>
  );
}

export default Projects;
