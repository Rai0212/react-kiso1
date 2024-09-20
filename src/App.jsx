import { useState, useEffect } from 'react';
import './App.css';
import ThreadList from './ThreadList';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import NewThread from './NewThread';

function App() {
  const [threads, setThreads] = useState([]);

  // スレッド一覧を取得する関数
  const fetchThreads = async () => {
    const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0');
    const data = await response.json();
    setThreads(data);
  };

  useEffect(() => {
    fetchThreads(); // 初期読み込みでスレッド一覧を取得
  }, []);

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
              element={<ThreadList threads={threads} fetchThreads={fetchThreads} />}
            />
            <Route
              path="/threads/new"
              element={<NewThread fetchThreads={fetchThreads} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
