import React from 'react';
import Navbar from '../main/navbar';
import styles from './frame.module.css';

function Frame({ children }: any) {
  return (
    <div className={styles.wrap}>
      <Navbar />
      <div className="body">{children}</div>
    </div>
  );
}

export default Frame;
