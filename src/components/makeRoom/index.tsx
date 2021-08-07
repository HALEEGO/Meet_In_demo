import React from 'react';
import { Link } from 'react-router-dom';
import CustomizedSelects from '../common/dropdown';
import Frame from '../common/frame';
import styles from './makeRoom.module.css';

export default function MakeRoom() {
  return (
    <Frame>
      <div className={styles.container}>
        <div className={styles.makeDiv}>
          Meeting method
          <CustomizedSelects />
          <input type="text" className={styles.inputtext} />
          <button type="button" className={styles.enterButton}>
            <Link to="room" className={styles.a}>
              Make
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.EnterContainer}>
        <div className={styles.makeDiv}>
          Room Number
          <input type="text" className={styles.inputtext} />
          <button type="button" className={styles.enterButton}>
            Enter
          </button>
        </div>
      </div>
    </Frame>
  );
}

/* <div className={styles.roomNumber}>
<div>
  room
  <input type="text" />
</div>
</div>
<div className={styles.roomPass}>
<div>
  password
  <input type="text" />
</div>
</div> */
