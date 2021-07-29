import React from 'react';
import { Link } from 'react-router-dom';
import Frame from '../common/frame';
import styles from './signup.module.css';

function SignUp() {
  return (
    <Frame>
      <div className={styles.flexbody}>
        <div className={styles.center}>
          <input type="text" className={styles.inputtext} />
          <input type="text" className={styles.inputtext} />
          <Link to="/home">
            <button type="button" className={styles.button}>
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </Frame>
  );
}

export default SignUp;

// login 버튼이 span으로 감싸져야하는데 그러면 ui 에러남
