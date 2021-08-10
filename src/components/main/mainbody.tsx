import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainbody.module.css';

function Mainbody() {
  return (
    <div className={styles.explaining}>
      <h1>실시간 소통, 다양한 회의 기법</h1>
      <p>
        실시간으로 소통하고 다양한 회의 기법을 단계별로 따라가며 쉽게 회의를 진행해 보세요.
        <br />
        상황에 맞는 가장 효율적인 회의 기법을 추천받아 보세요.
      </p>
      <div>
        <Link to="/makeRoom">
          <button type="button" className={styles.button}>
            <span />
            시작하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Mainbody;
