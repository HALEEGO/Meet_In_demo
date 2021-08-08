import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import meetinlogo from '../../assets/image/logobyungchan.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.a}>
        <img src={meetinlogo} className={styles.meetIn} alt="dd" />
      </Link>
      <ul>
        <li>
          <Link to="/home" className={styles.a}>
            home
          </Link>
        </li>
        <li>
          <Link to="/history" className={styles.a}>
            history
          </Link>
        </li>
        <li>
          <Link to="/makeRoom" className={styles.a}>
            makeRoom
          </Link>
        </li>
        <li>
          <Link to="/signup" className={styles.a}>
            signup
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.a}>
            login
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
