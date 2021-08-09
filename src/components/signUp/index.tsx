import axios from 'axios';
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, Redirect, Route } from 'react-router-dom';
import IP from '../../utils/type/constant/network';
import SgFrame from './sgFrame';
import styles from './signup.module.css';

function SignUp() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setSignUp] = useState(false);

  const createUser = (userID: string, userPW: string, userNAME: string) => {
    axios
      .post(`http://${IP}:8080/create/signup`, {
        userID,
        userPW,
        userNAME,
      })
      .then((response) => {
        console.log(
          `status : ${response.data.status}, message : ${response.data.message}, csMessage: ${response.data.customMessage}`,
        );
        console.log(response);
      })
      .then(() => setSignUp(true))
      .catch((error) => {
        console.log(
          `status : ${error.response.data.status}, message : ${error.response.data.message}, csMessage: ${error.response.data.customMessage}`,
        );
      })
      .finally(() => {
        setID('');
        setPassword('');
        setName('');
      });
  };

  if (isSignUp) {
    return (
      <Route>
        <Redirect to="/login/" />;
      </Route>
    );
  }

  return (
    <SgFrame>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className={styles.inputtext}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className={styles.inputtext}
          />
          <button type="submit" onClick={() => createUser(id, password, name)} className={styles.button}>
            SignUp
          </button>
        </div>
      </div>
    </SgFrame>
  );
}

export default SignUp;

// login 버튼이 span으로 감싸져야하는데 그러면 ui 에러남
