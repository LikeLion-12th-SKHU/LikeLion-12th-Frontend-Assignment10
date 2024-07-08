// src/index.js 또는 src/App.js 예시

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // QueryClient 및 QueryClientProvider 추가
import App from "./App";
import "./index.css";

const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* QueryClientProvider로 감싸기 */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
