import React, { useState } from 'react';
import Navbar from '../common/navbar';
import styles from './home.module.css';
import eye from '../../assets/image/method/6colorthink/eye.jpg';
import horse from '../../assets/image/method/6colorthink/horses.jpg';
import idea from '../../assets/image/method/brainstroming/idea.jpg';
import rainbow from '../../assets/image/method/6colorthink/rainbow.jpg';
import Side from './side';
import Dropdown from '../common/dropdown';

function Home() {
  const [selected, setSelected] = useState('choose one');
  // const meetKind = [
  //   {
  //     kind: 'brainstroming',
  //     key: 1,
  //   },
  //   {
  //     kind: '6-hat-thinking',
  //     key: 2,
  //   },
  //   {
  //     kind: '5whys',
  //     key: 3,
  //   },
  //   {
  //     kind: '635method',
  //     key: 4,
  //   },
  // ];

  const meetList = [
    {
      kind: 'brainstroming',
      date: '2021-07-01',
      key: 1,
    },
    {
      kind: '6-hat-thinking',
      date: '2021-07-02',
      key: 2,
    },
    {
      kind: '5whys',
      date: '2021-07-03',
      key: 3,
    },
    {
      kind: '635method',
      date: '2021-07-04',
      key: 4,
    },
  ];

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
              <div className={styles.choose}>
                Meeting method
                <Dropdown selected={selected} setSelected={setSelected} />
              </div>
              <div className={styles.choose}>
                password
                <input type="text" />
              </div>
            </div>
            <div className={styles.enterDiv}>
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
            <div className={styles.cTime}>current time : 2021.08.01</div>
            <div className={styles.meetLog}>
              {meetList.map((element, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                  {element.key} : {element.date} : {element.kind}
                </div>
                // Link to로 회의 결과로 네비게이팅 해야함
              ))}
            </div>
          </div>
          {/* 5번 콘텐츠 etc */}
          <div className={styles.etc}>etc</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
