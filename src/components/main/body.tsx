import React from 'react';
import styles from './body.module.css';

function Body() {
  return (
    <div className={styles.body}>
      <span className={styles.explain}>body</span>
      <div className={styles.trans}>
        <div>trans</div>
      </div>
    </div>
  );
}

export default Body;
