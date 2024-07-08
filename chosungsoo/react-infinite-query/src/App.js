// src/App.js
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./components/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
