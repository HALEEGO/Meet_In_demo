import React from 'react';
import Navbar from '../common/navbar';
import styles from './home.module.css';
import eye from '../../assets/image/method/6colorthink/eye.jpg';
import horse from '../../assets/image/method/6colorthink/horses.jpg';
import idea from '../../assets/image/method/brainstroming/idea.jpg';
import rainbow from '../../assets/image/method/6colorthink/rainbow.jpg';
import Side from './side';
import CustomizedSelects from '../common/dropdown';

function Home() {
  return (
    <div className={styles.scroll}>
      <Navbar />
      <div className={styles.homebody}>
        {/* <div className={styles.menubar}>메뉴</div> */}
        <Side />
        <div className={styles.content}>
          {/* 1번 콘텐츠 participate */}
          <div className={styles.participate}>
            <div className={styles.makeDiv}>
              Meeting method
              <CustomizedSelects />
              <button type="button">Enter</button>
              <div className={styles.roomNumber}>
                <div>
                  room
                  <input type="text" />
                </div>
              </div>
              <div className={styles.roomPass}>
                <div>
                  password
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          {/* 2번 콘텐츠 introduce */}
          <div className={styles.introduce}>
            <div>introduce block</div>
            <div>
              <ul>
                <img className={styles.way} src={eye} alt="" />
                <img className={styles.way} src={horse} alt="" />
                <img className={styles.way} src={idea} alt="" />
                <img className={styles.way} src={rainbow} alt="" />
              </ul>
            </div>
          </div>
          {/* 3번 콘텐츠 profile */}
          <div className={styles.profile}>
            <div>profile block</div>
            <div className={styles.profileImageBox}>
              <img className={styles.profileImage} src={horse} alt="" />
            </div>
            <div className={styles.profileOption}>
              <div className={styles.userInformation}>1. 학교 : HALEE고</div>
              <div className={styles.userInformation}>2. 나이 : 19</div>
              <div className={styles.userInformation}>3. 성별 : 남자</div>
              <div className={styles.userInformation}>4. 이메일 : HALEEGO@gmail.com</div>
            </div>
          </div>
          {/* 4번 콘텐츠 log */}
          <div className={styles.log}>
            <div>logo block</div>
          </div>
          {/* 5번 콘텐츠 etc */}
          <div className={styles.etc}>etc</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
