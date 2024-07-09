// src/App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './components/PostList';
import styled from 'styled-components';

const queryClient = new QueryClient();

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContainer>
                <Title>게시물 목록</Title>
                <PostList />
            </AppContainer>
        </QueryClientProvider>
    );
}

export default App;
