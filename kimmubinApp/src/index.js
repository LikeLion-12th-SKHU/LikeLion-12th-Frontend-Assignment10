import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    {/* React.StrictMode 가 무엇인지 구글링 하였음 
        ==> 개발 모드에서 추가적인 검사와 경고를 활성화 함. */}
    <QueryClientProvider client={queryClient}>
      {/* queryClient 객체를 전달한다 */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
