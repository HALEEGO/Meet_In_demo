import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import real from '../../assets/image/logo.png';

function RoomNav() {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.a}>
        <img src={real} className={styles.logo} alt="logo" />
      </Link>
      <ul>
        <li className={styles.a}>초대하기</li>
        <li>
          <Link to="/main" className={styles.a}>
            나가기
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default RoomNav;
