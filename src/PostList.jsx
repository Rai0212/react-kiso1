import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostList() {
  const { thread_id } = useParams(); // URLからスレッドIDを取得
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState(''); // 新しいコメント用のstate
  const [loading, setLoading] = useState(false); // ローディング状態を管理，最初はローディング中じゃないので，初期値はfalse

  // スレッドに対する投稿を取得する関数
  const fetchPosts = async () => {
    try {
      setLoading(true); // ローディング開始
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`);
      const data = await response.json();
      console.log('Fetched posts:', data); // デバッグ用ログ，得られたdataを確認

      if (response.ok) {
        setPosts(data.posts); // サーバーからの投稿データをセット(dataには，id，posts，が存在)
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  // コメントを投稿する関数
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページのリロードを防ぐ

    console.log('Sending comment:', newComment); // デバッグ用ログ，送られたコメントを確認

    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        method: 'POST', // コメント内容を送信
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: newComment }), // サーバー側がpostというキー名なので，こう書いてある
      });

      if (response.ok) {
        setNewComment(''); // 成功したら，入力をリセット
        fetchPosts(); // 投稿を取得しなおして，表示！
      } else {
        alert('コメントの投稿に失敗しました');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('コメントの投稿に失敗しました');
    }
  };

  useEffect(() => {
    fetchPosts(); // 初期読み込みで投稿を取得
  }, []);

  return (
    <div className='comment-list'> 
      <h3>スレッドID: {thread_id} のコメント一覧</h3>
      {loading ? ( // ローディング中のとき
        <p>読み込み中...</p>
      ) : ( // ローディング中でないとき
        <ul>
          {posts.length > 0 ? ( // そのフォームにコメントがあるとき
            posts.map((post) => {
              return (
              <li key={post.id}>
                <p>{post.post}</p> {/* コメントを表示 */}
              </li>
            );
          })
          ) : ( // コメントがないとき
            <p>投稿がありません。</p>
          )}
        </ul>
      )}

      {/* コメント投稿フォーム */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメントを入力してください"
          required
        />
        <button type="submit">コメントを投稿</button>
      </form>
    </div>
  );
}

export default PostList;
