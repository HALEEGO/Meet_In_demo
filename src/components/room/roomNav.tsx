import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import styles from './navbar.module.css';

import meetinlogo from '../../assets/image/mintlogo.png';
import SimpleModal from './modal';
import DotsMobileStepper from './stepper';

import greenHat from '../../assets/icon/greenHat.png';
// import redHat from '../../assets/icon/redHat.png';
// import blueHat from '../../assets/icon/blueHat.png';
// import whiteHat from '../../assets/icon/whiteHat.png';
// import yellowHat from '../../assets/icon/yellowHat.png';
// import blackHat from '../../assets/icon/blackHat.png';

function Navbar() {
  const [viewer, setViewer] = useState(false);
  const DisableElevation = () => (
    <ButtonGroup disableElevation variant="contained" color="inherit">
      <Button style={{ backgroundColor: '#f25c84' }} onClick={() => setViewer(true)}>
        Level
      </Button>
      <Button style={{ backgroundColor: '#59d9d9' }} onClick={() => setViewer(false)}>
        Explain
      </Button>
    </ButtonGroup>
  );

  // const exDiv = () => {
  //   if(dot === 0)
  //    return (
  //     <div className={styles.levelExplain}>
  //     <img src={greenHat} alt="d" />
  //     <span className={styles.role}>Idea Man</span>
  //     <span className={styles.work}>새로운 아이디어를 계속해서 제안해봅시다.</span>
  //   </div>);
  // }
  // 모자 색깔을 dot.steps에 따라서 {exDiv}로 리턴하는 if문이 필요

  let view = <div>기법에 따른 한줄요약이 나올 div</div>;

  if (viewer) {
    view = <DotsMobileStepper />;
  } else {
    view = (
      <div className={styles.levelExplain}>
        <img src={greenHat} alt="d" />
        <span className={styles.role}>Idea Man</span>
        <span className={styles.work}>새로운 아이디어를 계속해서 제안해봅시다.</span>
      </div>
    );
  }
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.a}>
        <img src={meetinlogo} className={styles.meetIn} alt="dd" />
      </Link>
      {view}
      <DisableElevation />
      <ul>
        <li>
          <SimpleModal />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
