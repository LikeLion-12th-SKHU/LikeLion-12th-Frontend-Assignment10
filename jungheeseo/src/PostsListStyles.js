import styled from "styled-components";

export const Loading = styled.p`
  text-align: center;
  color: #aaaaaa;
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
`;

export const Container = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

export const Button = styled.button`
  background-color: #0a6eff;
  color: #fff;
  font-weight: 700;
  border: 1px solid #0a6eff;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    border: 1px solid #ccc;
    cursor: pointer;
  }
`;

export const PostContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
  padding: 18px;
  background-color: #f8f9fa;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px #eeeeee;
`;

export const Title = styled.h2`
  color: #0078ff;
  font-size: 25px;
  margin-bottom: 10px;
`;

export const Date = styled.p`
  font-size: 15px;
`;
