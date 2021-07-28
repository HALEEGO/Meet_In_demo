import React from 'react';
import Body from './body';
import styles from './index.module.css';
import Navbar from './navbar';

function Main() {
  return (
    <div className={styles.wrap}>
      <Navbar />
      <Body />
    </div>
  );
}

export default Main;
