import styled from "styled-components";

export const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const BlogPosts = styled.div`
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  width: 350px;
  height: 70px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BlogTitle = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const BlogDate = styled.div`
  font-size: 14px;
`;

export const MorePostBtn = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;
