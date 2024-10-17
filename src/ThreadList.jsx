import React from 'react';
import { Link } from 'react-router-dom';

function ThreadList({ threads }) { // App.jsxからthreads(配列)を受け取る
  return (
    <div className='thread-list'>
      <h3>スレッド一覧</h3>
      <ul> {/* リストで表示 */}
        {threads.map(thread => ( // ループ処理で，それぞれのスレッドを表示
          <li key={thread.id}>
            <Link to={`/threads/${thread.id}`}>
              {thread.title} {/* スレッドのタイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
