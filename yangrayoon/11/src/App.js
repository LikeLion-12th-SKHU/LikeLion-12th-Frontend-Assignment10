import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Post from "./Post";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Post />
    </QueryClientProvider>
  );
}

export default App;
