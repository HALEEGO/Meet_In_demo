import React from 'react';
import styles from './navbar.module.css';
import real from './real.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <img src={real} className={styles.logo} alt="dd" />
      <ul>
        <li>home</li>
        <li>about us</li>
        <li>participate</li>
        <li>signup</li>
        <li>login</li>
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
