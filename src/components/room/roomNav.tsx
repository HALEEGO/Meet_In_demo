import React, { useState } from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import styles from './navbar.module.css';

import SimpleModal from './modal';
import DotsMobileStepper from './stepper';

import greenHat from '../../assets/icon/greenHat.png';
import redHat from '../../assets/icon/redHat.png';
import blueHat from '../../assets/icon/blueHat.png';
import whiteHat from '../../assets/icon/whiteHat.png';
import yellowHat from '../../assets/icon/yellowHat.png';
import blackHat from '../../assets/icon/blackHat.png';

function Navbar({ level, setLevel }: any) {
  const [viewer, setViewer] = useState(false);
  // const [level, setLevel] = useState(0);
  const DisableElevation = () => (
    <ButtonGroup disableElevation variant="contained" color="inherit">
      <Button style={{ backgroundColor: '#f25c84' }} className={styles.elevator} onClick={() => setViewer(true)}>
        Level
      </Button>
      <Button style={{ backgroundColor: '#59d9d9' }} className={styles.elevator} onClick={() => setViewer(false)}>
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

  let view = <div> make에서 넘어온 제목을 표시할 공간 </div>;
  let capImage = blueHat;

  if (viewer) {
    view = <DotsMobileStepper level={level} setLevel={setLevel} />;
  } else if (level === 1) {
    capImage = greenHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>아이디어 제안자</span>
        <span className={styles.work}>새로운 아이디어를 계속해서 제안해봅시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  } else if (level === 2) {
    capImage = redHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>직관주의자</span>
        <span className={styles.work}>아이디어를 듣는 순간의 느낌을 이야기해봅시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  } else if (level === 3) {
    capImage = yellowHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>낙관주의자</span>
        <span className={styles.work}>아이디어의 좋은 점을 부각시켜봅시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  } else if (level === 4) {
    capImage = blackHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>비관주의자</span>
        <span className={styles.work}>아이디어의 문제점을 도출해봅시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  } else if (level === 5) {
    capImage = blueHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>논리주의자</span>
        <span className={styles.work}>논리적으로 그 문제를 분석해봅시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  } else if (level === 6) {
    capImage = whiteHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>사회자</span>
        <span className={styles.work}>모든 차원의 정보를 정리헤봅시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  } else if (level === 7) {
    capImage = blueHat;
    view = (
      <div className={styles.levelExplain}>
        <span className={styles.role}>끝</span>
        <span className={styles.work}>히스토리에 기록합시다.</span>
        <SimpleModal level={level} />
      </div>
    );
  }
  // level 0, 7은 시작과 끝의 기능을 맡게 함
  return (
    <div className={styles.navbar}>
      <div>
        <img src={capImage} className={styles.logoHat} alt="dd" />
      </div>

      {view}
      <DisableElevation />
    </div>
  );
}

export default Navbar;
