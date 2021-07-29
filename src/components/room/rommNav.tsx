import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import real from '../../assets/image/logo.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.a}>
        <img src={real} className={styles.logo} alt="dd" />
      </Link>
      <ul>
        <li>
          <Link to="/home" className={styles.a}>
            home
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.a}>
            about us
          </Link>
        </li>
        <li>
          <Link to="/participate" className={styles.a}>
            participate
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
