import React from 'react';
import styles from './mainbody.module.css';

function Mainbody() {
  return (
    <div className={styles.explaining}>
      <h1>MEET IN G ROOM</h1>
      <p>PARTICIPATE YOUR MEETING ROOM WITH YOUR COLLEAGUE</p>
      <div>
        <button type="button">
          <span />
          START
        </button>
        <button type="button">
          <span />
          GUEST MODE
        </button>
      </div>
    </div>
  );
}

export default Mainbody;
