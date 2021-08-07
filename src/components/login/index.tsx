import axios from 'axios';
import React, { useContext } from 'react';

// eslint-disable-next-line no-unused-vars
import { Link, Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/loginContext';
import Frame from '../common/frame';
import styles from './login.module.css';

function Login() {
  const [id, setID] = React.useState('');
  const [pw, setPW] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
  const { login, user }: any = useContext(AuthContext);

  const getUser = (userID: string, userPW: string) => {
    axios
      .post('http://192.168.219.111:8080/read/login', {
        userID,
        userPW,
      })
      .then((response) => {
        console.log(response);
        login(response.data.object.id, response.data.object.userNAME);
        setIsLogin(true);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setID('');
        setPW('');
      });
  };
  if (user.isAuth) {
    return <div>이미 로그인하였습니다.</div>;
  }
  if (isLogin) {
    setIsLogin(false);
    return (
      <Route>
        <Redirect to="/makeRoom" />
      </Route>
    );
  }

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
