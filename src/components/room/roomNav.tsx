import React from 'react';
import { Link } from 'react-router-dom';

import styles from './navbar.module.css';

import meetinlogo from '../../assets/image/mintlogo.png';
import SimpleModal from './modal';
import DotsMobileStepper from './stepper';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.a}>
        <img src={meetinlogo} className={styles.meetIn} alt="dd" />
      </Link>
      <DotsMobileStepper />
      <ul>
        <li>
          <SimpleModal />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
