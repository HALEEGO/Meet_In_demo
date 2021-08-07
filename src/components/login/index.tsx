import axios from 'axios';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import Frame from '../common/frame';
import styles from './login.module.css';

function Login() {
  const [id, setID] = React.useState('');
  const [pw, setPW] = React.useState('');

  const getUser = (userID: string, userPW: string) => {
    axios
      .post('http://192.168.0.133:8080/read/login', {
        userID,
        userPW,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setID('');
        setPW('');
      });
  };

  return (
    <Frame>
      <div className={styles.flexbody}>
        <div className={styles.center}>
          <input
            type="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
            placeholder="아이디"
            className={styles.inputtext}
          />
          <input
            type="text"
            value={pw}
            onChange={(e) => setPW(e.target.value)}
            placeholder="비밀번호"
            className={styles.inputtext}
          />
          <button type="submit" onClick={() => getUser(id, pw)} className={styles.button}>
            Login
          </button>
        </div>
      </div>
    </Frame>
  );
}

export default Login;

// login 버튼이 span으로 감싸져야하는데 그러면 ui 에러남
