import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewThread({ fetchThreads }) {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // e = event
    e.preventDefault();

    // 新しいスレッドを作成するためのAPIリクエスト
    const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      // スレッド作成後にリストをリフレッシュ
      await fetchThreads();
      navigate('/'); // スレッド一覧ページに戻る
    } else {
      alert('スレッドの作成に失敗しました');
    }
  };

  return (
    <div>
      <h2>スレッドを新規作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="スレッドタイトルを入力してください"
          required
        />
        <button type="submit">作成</button>
      </form>
    </div>
  );
}

export default NewThread;
