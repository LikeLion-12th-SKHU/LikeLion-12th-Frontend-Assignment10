// src/App.js

import React from "react";
import PostList from "./api/PostList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>내 블로그 앱</h1>
      </header>
      <main>
        <PostList />
      </main>
    </div>
  );
}

export default App;
