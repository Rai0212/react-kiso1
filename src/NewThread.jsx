import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewThread({ fetchThreads }) { // App.jsxからfetchThreadsを受け取る
  const [title, setTitle] = useState(''); // タイトル保持のための変数，初期状態は空白文字
  const navigate = useNavigate(); // navigate関数を使うことで，任意のタイミングでURLを変更することができるようになる！

  const handleSubmit = async (e) => { // フォームを送信するための関数．e = event
    e.preventDefault(); // ページのリロードを防ぐ

    // 新しいスレッドを作成するためのAPIリクエスト(参考資料：https://zenn.dev/haru330/articles/859d6a7982d06d)
    const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST', // 新規に作成したスレッドをサーバーに送信する
      headers: {
        'Content-Type': 'application/json', // 送信するデータがJSON形式であることを表している
      },
      body: JSON.stringify({ title }), // 下のreturn文で入力された title をJSON形式に変換し，これがスレッドのタイトルになる．サーバー側でtitleに対応するキーがこっちからは見えないので，これでOK．
    });

    if (response.ok) { // サーバーがリクエストを正しく(正常に)処理出来たとき，
      await fetchThreads(); // スレッド一覧を取得しなおして，表示
      navigate('/'); // スレッド一覧 = ホーム に戻る
    } else {
      alert('スレッドの作成に失敗しました');
    }
  };

  return (
    <div className="new-thread">
      <h3>スレッドを新規作成</h3>
      <form className="new-thread-form" onSubmit={handleSubmit}> {/* onSubmit = このフォームが送信されたとき = 作成ボタン を押したとき，handliSubmit関数を呼び出し */}
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
