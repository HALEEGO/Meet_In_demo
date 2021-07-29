import React from 'react';
import { Link } from 'react-router-dom';
import Frame from '../common/frame';
import styles from './login.module.css';

function Login() {
  return (
    <Frame>
      <div className={styles.flexbody}>
        <div className={styles.center}>
          <input type="text" className={styles.inputtext} />
          <input type="text" className={styles.inputtext} />
          <Link to="/home">
            <button type="button" className={styles.button}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </Frame>
  );
}

export default Login;

// login 버튼이 span으로 감싸져야하는데 그러면 ui 에러남
