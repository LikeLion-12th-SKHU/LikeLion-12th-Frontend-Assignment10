import { useInfiniteQuery } from "@tanstack/react-query";
import fetchPosts from "./FetchPosts";
import styled from "styled-components";

export const Post = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-paginated"], //쿼리 키 배열
      queryFn: fetchPosts, //fetchPosts함수로 데이터 불러오기
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.posts && lastPage.posts.length === 6) {
          return allPages.length + 1; // 페이지에 6개의 포스트가 있으면 다음 페이지 번호 반환
        } else {
          return undefined; // 그렇지 않으면 다음 페이지 없음 반환 해줌
        }
      },
    });

  if (isLoading) return <div>Loading,,,</div>;

  if (!data) return <div>데이터 없는디용,,</div>;

  return (
    <Container>
      {data.pages.map(
        (page, index) =>
          page && (
            <div key={index}>
              {page.posts.map((post, index) => (
                <DataStyle key={index}>
                  <TitleStyle>{post.title}</TitleStyle>
                  <div>{post.date}</div>
                </DataStyle>
              ))}
            </div>
          )
      )}
      <ButtonStyle
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "더 불러오기"
          : hasNextPage
          ? "더 불러오기"
          : "마지막 페이지"}
      </ButtonStyle>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  padding: auto;
`;
const DataStyle = styled.div`
  display: flex;
  border-radius: 5px;
  box-shadow: 1px 3px 3px #c8c8c8;
  flex-direction: column;
  align-items: center;
  margin: 15px 10px;
  padding: 20px 30px;
  height: 70px;
  width: 380px;
`;
const ButtonStyle = styled.button`
  border: none;
  background-color: #4367f5;
  margin: 20px;
  padding: 10px 20px;
  color: aliceblue;
  border-radius: 5px;
`;
const TitleStyle = styled.div`
  margin: 10px;
  font-weight: bold;
`;
