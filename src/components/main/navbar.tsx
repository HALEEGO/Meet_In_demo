import React from 'react';
import styles from './navbar.module.css';
import meetigtmln from './meetin.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={meetigtmln} alt="dd" />
      </div>
      <div className={styles.button}>menu1</div>
      <div className={styles.button}>menu2</div>
      <button type="button">Login</button>
    </div>
  );
}

export default Navbar;
