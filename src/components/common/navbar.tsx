import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import meetinlogo from '../../assets/image/logobyungchan.png';
import { AuthContext } from '../../context/loginContext';

function Navbar() {
  const { user }: any = useContext(AuthContext);
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.a}>
        <img src={meetinlogo} className={styles.meetIn} alt="dd" />
      </Link>
      <ul>
        <li>
          <Link to="/home" className={styles.a}>
            홈
          </Link>
        </li>
        {user.id ? (
          <li>
            <Link to="/history" className={styles.a}>
              회의 기록
            </Link>
          </li>
        ) : (
          <></>
        )}
        <li>
          <Link to="/makeRoom" className={styles.a}>
            {user.id ? '방만들기' : '참여하기'}
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.a}>
            로그인
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

/*
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={real} height="80" width="100" alt="dd" />
      </div>
      <div className={styles.button}>menu1</div>
      <div className={styles.button}>menu2</div>
      <button type="button">Login</button>
    </div>
*/
