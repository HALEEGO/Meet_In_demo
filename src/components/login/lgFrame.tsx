import React from 'react';
import Navbar from '../common/navbar';
import styles from './lgFrame.module.css';

function Frame({ children }: any) {
  return (
    <div className={styles.wrap}>
      <Navbar />
      {children}
    </div>
  );
}

export default Frame;
