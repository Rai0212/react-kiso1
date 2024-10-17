import { useState, useEffect } from 'react';
import './App.css';
import ThreadList from './ThreadList';
import React from 'react';
import NewThread from './NewThread';
import PostList from './PostList';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function App() {
  const [threads, setThreads] = useState([]);

  // スレッド一覧を取得する関数 fetchThreads
  const fetchThreads = async () => {
    const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
    const data = await response.json(); // JSON形式で取得
    setThreads(data); // threadsに格納
  };

  useEffect(() => {
    fetchThreads(); // 初期読み込みでスレッド一覧を取得
  }, []); // 依存配列が空 → 1回のみ実行される

  return (
    <Router>
      <div>
        <header>
          <h1>掲示板</h1>
          <nav>
            <Link to="/">ホーム</Link>
            <Link to="/threads/new">新規スレッド作成</Link>
          </nav>
        </header>
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              /* ルートが / の時，ThreadListのコンポーネントを表示，threadsを渡す */
              element={<ThreadList threads={threads} />}
            />
            <Route
              path="/threads/new"
              /* ルートが /threads/new の時，NewThreadのコンポーネントを表示，スレッドを作った後に一覧を再取得するために，fetchThreadsを渡す */
              element={<NewThread fetchThreads={fetchThreads} />}
            />
            <Route
              path="/threads/:thread_id"
              /* ルートが /threads/そのthreadのid の時，PostListのコンポーネントを表示 */
              element={<PostList />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
