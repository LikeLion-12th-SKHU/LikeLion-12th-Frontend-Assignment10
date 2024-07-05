import React from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// styled-components ⭐️⭐️ 필수 ⭐️⭐️
//전체 컨테이너
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;
// 내용 전체를 덮고 있는
const Post = styled.div`
  margin-bottom: 30px;
  box-shadow: 1px 2px 1px 2px #dbdbdb;
  border-radius: 8px;
`;
// 제목
const Title = styled.h2`
  font-size: 18px;
`;
// 카테고리
const Category = styled.div`
  font-size: 15px;
`;
// 인용구
const Excerpt = styled.p`
  font-size: 15px;
`;

// ⭐️⭐️ 필수 ⭐️⭐️
// 로딩 스피너 ( 로딩할 떄 도는 동그라미 )
// 스피너 이쁘게 꾸며보고 싶어서 그냥 했는데 대충 읽고 넘어가주세영 ㅎ..
const Spinner = styled.div`
  border: 3px solid rgba(129, 177, 255, 1); // 파란색 테두리
  border-top: 3px solid #ffffff; // 흰색 상단 테두리
  border-radius: 50%; // 동그라미 모양으로 하기 위함
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  // spin 애니메이션을 1초 동안 무한 반복 시행
  // linear 애니메이션의 속도가 일정하게 유지됨
  margin: 20px auto;
  // 스피너를 중앙에 위치 시키기
  @keyframes spin {
    0% {
      transform: rotate(0deg); // 시작할 떄 회전 각도 ( 0deh => 0도 )
    }
    100% {
      transform: rotate(360deg); // 끝날 때 회전 각도 ( 360deg => 360도 )
    }
  }
`;
// ⭐️⭐️ 필수 ⭐️⭐️
// 게시물 데이터를 가지고 오는 fetchPosts 함수 async/await 사용
const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6; // 시작 인덱스와 종료 인덱스를 계산
  const end = start + 6;
  const response = await axiosInstance.get(`/posts?start=${start}&end=${end}`);
  return response.data; // 응답 데이터 반환
};

// 게시물리스트 컴포넌트
const PostList = () => {
  // useInfiniteQuery 를 사용하여 무한 스크롤 데이터 가져오기 ⭐️⭐️ 필수 ⭐️⭐️
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["posts"], // 캐시와 함께 사용할 키
    queryFn: fetchPosts, // 데이터를 가져오는 함수
    getNextPageParam: (lastPage) => lastPage.page + 1, // 다음 페이지를 가져오는 함수
  });

  // 데이터가 없는 경우 아무것도 null 반환
  if (!data) return null;

  // 데이터가 있는 경우 반환
  return (
    <Container>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {/* React.Fragment => 여러 요소를 그룹화하는 데 사용, 불필요한 요소를 만들지 않아도 됨 */}
          {/* pageIndex 를 key 로 사용 */}
          {page.posts.map((post, index) => (
            // posts 의 배열을 순회하면서 게시물을 렌더링함
            // post 와 index를 매개변수로
            <Post key={index}>
              {/* index를 key로 */}
              <Title>{post.title}</Title>
              <Category>{post.category}</Category>
              <Excerpt>{post.excerpt}</Excerpt>
            </Post>
          ))}
        </React.Fragment>
      ))}
      {isFetching && <Spinner />}
      {/* ifFetching(Boolean 값)이 true 이면 스피너를 렌더링 */}
      {hasNextPage && (
        // hasNextPage 가 true일 때 버튼 렌더링
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          더 불러오기
        </button>
      )}
    </Container>
  );
};
// key 는 React가 각 항목을 고유하게 식별하고, 리스트가 변경될 때 효율적으로 업데이트할 수 있도록
// 돕는 중요한 속성입니다.
// 추가, 수정, 삭제될 때 React가 어떤 항목이 변경되엇는지 효율적으로 알 수 있습니다.

// index를 key로 사용??
//    리스트들 각각의 고유한 ID가 없고, 리스트가 변경되지 않고나 변경이 드물 때 index를 key로 사용해도 문제 없음
//    but. 순서가 변경되고 추가, 삭제가 될 경우 문제가 생길 수 있음
export default PostList;
