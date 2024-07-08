import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPostList from "./BlogPostList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* QueryClientProvider로 QueryClient 객체 제공, 애플리케이션 전역에서 상태 관리 */}
      <BlogPostList />
    </QueryClientProvider>
  );
};

export default App;
