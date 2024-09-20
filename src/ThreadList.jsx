import React from 'react';

function ThreadList({ threads }) {
  return (
    <div>
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
