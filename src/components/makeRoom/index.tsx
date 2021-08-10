/* eslint-disable no-console */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../context/loginContext';
import IP from '../../utils/type/constant/network';
import CustomizedSelects from '../common/dropdown';
import MrFrame from './mrFrame';
import styles from './makeRoom.module.css';

export default function MakeRoom() {
  const { user }: any = useContext(AuthContext);
  console.log(user.id);
  console.log(user.name);
  const [meetType, setMeetType] = useState('');
  const [subject, setSubject] = useState('');
  const [roomID, setRoomID] = useState('');
  const [isMake, setIsMake] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [userList, setUserList] = useState<Array<any>>();
  const [host, setHost] = useState('');

  console.log(meetType);

  const createRoom = () => {
    console.log('createRoom Clicked');
    axios
      .post(`http://${IP}:8080/create/createroom`, {
        id: user.id,
        meetType,
        title: subject,
      })
      .then((response) => {
        console.log(response);
        setHost(response.data.object.hostUSER.userNAME);
        setRoomID(response.data.object.roomID);
        setUserList([{ userNAME: response.data.object.hostUSER.userNAME }]);
        console.log(` userlist 확인  : ${userList}`);

        setIsMake(true);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {});
  };

  function enterRoomLogin() {
    axios
      .post(`http://${IP}:8080/create/enterroom`, {
        id: user.id,
        roomID,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.object.userPARTICIPANT);
        setUserList(response.data.object.userPARTICIPANT);
        setHost(response.data.object.hostUSER.userNAME);
        setRoomID(response.data.object.roomID);
        setSubject(response.data.object.title);
        console.log(userList);
        setIsEnter(true);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {});
  }

  if (isMake) {
    return (
      <Route>
        <Redirect
          to={{
            pathname: '/room',
            state: { roomID, isHost: 'HOST', subject, userList, host },
          }}
        />
      </Route>
    );
  }
  if (isEnter) {
    return (
      <Route>
        <Redirect
          to={{
            pathname: '/room',
            state: { roomID, isHost: 'NO', subject, userList, host },
          }}
        />
      </Route>
    );
  }
  return (
    <MrFrame>
      <div className={styles.container}>
        <div className={styles.makeDiv}>
          회의 기법
          <CustomizedSelects type={meetType} setType={setMeetType} />
          <input
            type="text"
            placeholder="회의 주제를 입력해 주세요."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={styles.inputtext}
          />
          <button type="submit" onClick={createRoom} className={styles.enterButton}>
            방 만들기
          </button>
        </div>
      </div>
      <div className={styles.EnterContainer}>
        <div className={styles.makeDiv}>
          방 번호
          <input
            type="text"
            placeholder="방번호"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            className={styles.inputtext}
          />
          <button type="submit" onClick={enterRoomLogin} className={styles.enterButton}>
            방 참여하기
          </button>
        </div>
      </div>
    </MrFrame>
  );
}
