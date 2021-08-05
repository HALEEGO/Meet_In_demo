import React from 'react';
import { Link } from 'react-router-dom';
import Frame from '../common/frame';
import TitlebarImageList from './log';
import styles from './history.module.css';

function History() {
  return (
    <Link to="/history">
      <Frame>
        <div className={styles.container}>
          <TitlebarImageList />
        </div>
      </Frame>
    </Link>
  );
}

export default History;

// login 버튼이 span으로 감싸져야하는데 그러면 ui 에러남
