import React from 'react';
import './index.css';

function Main() {
  return (
    <div>
      <div className="title">Meet In</div>
      <div className="content">
        <div>
          <button type="button">로그인</button>
        </div>
        <div>
          <button type="button">로그인 없이 시작</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
