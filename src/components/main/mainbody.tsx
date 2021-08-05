import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainbody.module.css';

function Mainbody() {
  return (
    <div className={styles.explaining}>
      <h1>MEET IN G ROOM</h1>
      <p>PARTICIPATE YOUR MEETING ROOM WITH YOUR COLLEAGUE</p>
      <div>
        <Link to="/makeRoom">
          <button type="button" className={styles.button}>
            <span />
            START
          </button>
        </Link>
        <Link to="/makeRoom">
          <button type="button" className={styles.button}>
            <span />
            GUEST MODE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Mainbody;
