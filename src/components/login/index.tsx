import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/loginContext';
import IP from '../../utils/type/constant/network';
import LgFrame from './lgFrame';
import styles from './login.module.css';

function Login() {
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const { login, user }: any = useContext(AuthContext);

  const getUser = (userID: string, userPW: string) => {
    axios
      .post(`http://${IP}:8080/read/login`, {
        userID,
        userPW,
      })
      .then((response) => {
        console.log(response);
        console.log(`통신 직후 : ${response.data.object.id}`);
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
  if (isLogin) {
    return (
      <Route>
        <Redirect to="/makeRoom" />
      </Route>
    );
  }
  if (user.isAuth) {
    return <div>이미 로그인하였습니다.</div>;
  }

  return (
    <LgFrame>
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
    </LgFrame>
  );
}

export default Login;
