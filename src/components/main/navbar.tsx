import React from 'react';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.button}>menu1</div>
      <div className={styles.button}>menu2</div>
      <div className={styles.button}>Login</div>
    </div>
  );
}

export default Navbar;
