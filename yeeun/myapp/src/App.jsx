import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPostList from "./BlogPostList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPostList />
    </QueryClientProvider>
  );
};

export default App;
