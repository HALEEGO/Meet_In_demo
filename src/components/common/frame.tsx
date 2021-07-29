import React from 'react';
import Navbar from '../main/navbar';
import styles from './frame.module.css';

function Frame({ children }: any) {
  return (
    <div className={styles.wrap}>
      <Navbar />
      {children}
    </div>
  );
}

export default Frame;
