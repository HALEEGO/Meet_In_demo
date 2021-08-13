import React, { useState, useContext, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Stage, Layer, Text, Line } from 'react-konva';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Button from '@material-ui/core/Button';
import styles from './index.module.css';
import RoomNav from './roomNav';
import PostIt from './postIt';
import toolPost from '../../assets/icon/sticky-note.png';
import toolPen from '../../assets/icon/pen.png';
import toolHigh from '../../assets/icon/highlighter.png';
import toolEraser from '../../assets/icon/eraser.png';
import toolGraph from '../../assets/icon/graph.png';
import toolVote from '../../assets/icon/vote.png';
import toolShape from '../../assets/icon/shapes.png';
import toolSelector from '../../assets/icon/selection.png';
import toolImage from '../../assets/icon/picture.png';
import toolTrashCan from '../../assets/icon/delete.png';
import IP from '../../utils/type/constant/network';
import { AuthContext } from '../../context/loginContext';
import FirstModal from './firstModal';
import InviteModal from './inviteModal';

// type textType = {
//   textEditVisible: boolean;
//   textX: number;
//   fill: string;
//   textY: number;
//   textValue: string;
//   fontSize: number;
//   width: number;
//   fontStyle: string;
//   align: string;
//   id: number;
// };
//
//
//
//

let stompClient: Stomp.Client;
let sockJS: WebSocket;
//
//
//
//

function Room(props: any) {
  const { user }: any = useContext(AuthContext);
  const { location } = props;
  //
  //
  //

  // eslint-disable-next-line no-unused-vars
  const { roomID, userList, host, isHost, subject } = location.state;
  console.log(subject);

  const windowX = window.innerWidth; // 화면 전체 가로 받기
  const windowY = window.innerHeight; // 화면 전체 세로 받기
  // --------------------------------------------------------------------
  //
  //
  //
  //
  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️회의 스테이트 ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  const [level, setLevel] = useState<number>(); // 모자 단계 - 초기값 undefined
  const [latestLevel, setLatestLevel] = useState<number>();
  // eslint-disable-next-line no-unused-vars
  const [ptList, setPtList] = useState(userList); // 참가자 리스트

  const [open, setOpen] = React.useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const changeOpen = () => {
    setOpen((prior) => !prior);
  };
  // const refPostItID = useRef()
  // --------------------------------------------------------------------
  //
  //
  //
  //
  //
  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️ : 콘바 스테이트 ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  const [x, setX] = useState(50); // 좌표 확인용 텍스트 위치
  const [y, setY] = useState(50); // ''
  //
  //
  //

  const [stages, setStages] = useState({
    // 스테이지 스케일 및 xy 정보
    scale: 1,
    x: 0,
    y: 0,
  });
  //
  //
  //
  //
  const [postIts, setPostIts] = useState<Array<any>>([]); // 포스트잇 스타일 리스트

  const [oldStage, setOldStage] = useState<Array<any>>([]);

  const [oldText, setOldText] = useState<Array<any>>([]);
  console.log(` old stage ${JSON.stringify(oldStage, null, ' ')}`);
  console.log(` new Stage : ${JSON.stringify(postIts, null, ' ')}`);
  console.log(` oldText : ${JSON.stringify(oldText, null, ' ')}`);

  const [isPostIt, setIsPostIt] = useState(false); // 포스트잇 버튼 클릭 했는가

  const [text, setText] = useState<Array<any>>([]); // 포스트잇 글씨 -> postIts랑 index 번호 같음
  console.log(` current Text : ${JSON.stringify(text, null, ' ')}`);

  const [postItID, setPostItID] = useState<number>(0); // 포스트잇 아이디

  const [selectedId, selectShape] = React.useState(null); // 클릭시 선택된 포스트잇 아이디

  //
  //
  //
  // 유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프  유즈레프
  const refPostIt = useRef(postIts);
  refPostIt.current = postIts;
  // eslint-disable-next-line no-unused-vars
  const refPostItID = useRef(postItID);
  refPostItID.current = postItID;
  const refText = useRef(text);
  refText.current = text;
  const refStages = useRef(stages);
  refStages.current = stages;
  const refOldStage = useRef(oldStage);
  refOldStage.current = oldStage;
  const refOldText = useRef(oldText);
  refOldText.current = oldText;

  // ------------------------------------------------------------------------------// ------------------------------------------------------------------------------
  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️ 콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드  콘바 메소드 ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  // ------------------------------------------------------------------------------// ------------------------------------------------------------------------------
  //
  //
  // 포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼  포스트잇버튼
  const changeIsPostIt = () => {
    setIsPostIt(!isPostIt);
  };
  //
  //
  //
  // 바깥 클릭해서 클릭 해제 되었는가 확인
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  //
  //
  //
  // 스크롤 내리는거 인식
  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStages({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
  };
  //
  //
  //
  //
  //
  //
  //
  //
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기  포스트잇 보내기
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  const sendPostIt = (sendX: any, sendY: any) => {
    let piColor = 'YELLOW';
    if (level === 0) {
      piColor = 'BLUE';
    } else if (level === 1) {
      piColor = 'GREEN';
    } else if (level === 2) {
      piColor = 'RED';
    } else if (level === 3) {
      piColor = 'YELLOW';
    } else if (level === 4) {
      piColor = 'BLACK';
    }
    stompClient.send(
      `/app/move/postit/${roomID}`,
      {},
      JSON.stringify([
        {
          locationX: sendX,
          locationY: sendY,
          postitCONTEXT: '텍스트를 입력하세요.',
          postitID: -1,
          width: 100,
          height: 100,
          postitCOLOR: piColor,
          user: { userNAME: user.name, id: user.id },
        },
      ]),
    );
  };
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기  포스트잇 붙이기
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  const attachPostIt = (e: any) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (isPostIt) {
      const sendX = stage.getPointerPosition().x / stages.scale - stage.x() / stages.scale;
      const sendY = stage.getPointerPosition().y / stages.scale - stage.y() / stages.scale;
      sendPostIt(sendX, sendY);
      changeIsPostIt();
    }
  };
  // 😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
  //
  //
  //
  //
  //
  //
  //
  //
  // 입퇴장 관련 버튼
  const Invite = () => (
    <Button
      onClick={() => setInviteOpen(true)}
      style={{ backgroundColor: '#59d9d9' }}
      variant="contained"
      color="inherit"
      disableElevation
    >
      초대하기
    </Button>
  );

  const PartExit = () => (
    <Button style={{ backgroundColor: '#f25c84' }} variant="contained" color="inherit" disableElevation>
      나가기
    </Button>
  );
  //
  //
  //
  //
  //
  //
  // const HostExit = () => (
  //   <Button variant="contained" color="primary" disableElevation>
  //     나가기 또는 회의 종료
  //   </Button>
  // );

  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ 포스트잇 글씨 관련 메소드들 ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  // eslint-disable-next-line no-unused-vars
  // 엔터 누르면 텍스트 에이리어 사라지게 해주기
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력  텍스트입력
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  const handleTextareaKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // 13 == enter
      const newText = [...text];
      // eslint-disable-next-line no-unused-expressions
      if (selectedId) {
        console.log(`---------------------------selected id: ${selectedId}`);
        newText[selectedId ?? 0].textEditVisible = false;
        setText([...newText]);
        const { id, width, height, fill }: any = postIts[selectedId ?? 0];
        const enterX = postIts[selectedId ?? 0].x;
        const enterY = postIts[selectedId ?? 0].y;
        stompClient.send(
          `/app/move/postit/${roomID}`,
          {},
          JSON.stringify([
            {
              locationX: enterX,
              locationY: enterY,
              postitCONTEXT: newText[selectedId ?? 0].textValue,
              postitID: id,
              width,
              height,
              postitCOLOR: fill,
              user: { userNAME: user.name, id: user.id },
            },
          ]),
        );
      }
    }
  };
  // 😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
  //
  //
  //
  //
  //
  //
  //
  // 텍스트 에이리어 이벤트 인식해서 포스트잇 텍스트 바꿔주기
  // eslint-disable-next-line no-unused-vars
  const handleTextEdit = (e: any) => {
    const newText = [...text];
    // eslint-disable-next-line no-unused-expressions
    if (selectedId) {
      newText[selectedId ?? 0].textValue = e.target.value;
      setText([
        ...newText, // separator operation
      ]);
    }
  };
  //
  //
  //
  //
  //
  //
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존 기존 포스트잇  기존
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  const movePostIt = (newPostIt) => {
    // 기존 포스트잇 변경

    const tempPostIt = refPostIt.current;
    const tempText = refText.current;
    console.log(`in front move postIts tempPostIt: ${JSON.stringify(tempPostIt)}`);
    console.log(`in front move postIts newPostIt: ${JSON.stringify(newPostIt)}`);
    console.log(`in front move postIts tempText: ${JSON.stringify(tempText)}`);
    tempPostIt.forEach((p: any, index) => {
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-unused-expressions
      p.id === newPostIt.postitID
        ? ((tempPostIt[index] = {
            x: newPostIt.locationX,
            y: newPostIt.locationY,
            id: p.id,
            width: newPostIt.width,
            height: newPostIt.height,
            fill: newPostIt.postitCOLOR,
            shadowBlur: 6,
          }),
          (tempText[index] = {
            textEditVisible: false,
            textX: 0,
            fill: 'black',
            textY: 0,
            textValue: newPostIt.postitCONTEXT,
            fontSize: 8,
            width: 400,
            fontStyle: 'normal',
            align: 'left',
            id: p.id,
          }))
        : {};
    });
    console.log(`in front move changed tempPostIt: ${JSON.stringify(tempPostIt)}`);
    setPostIts([...tempPostIt]);
  };
  // 😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
  //
  //
  //
  //
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 새로운 새로운 포스트잇  새로운 새로운 포스트잇  새로운 새로운 포스트잇  새로운 새로운 포스트잇  새로운 새로운 포스트잇  새로운 새로운 포스트잇  새로운 새로운 포스트잇  새로운 새로운 포스트잇
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  const takeNewPostIt = (newPostIt) => {
    setPostIts((prior) => [
      ...prior,
      {
        x: newPostIt.locationX,
        y: newPostIt.locationY,
        id: refPostItID.current,
        width: newPostIt.width,
        height: newPostIt.height,
        fill: newPostIt.postitCOLOR,
        shadowBlur: 6,
      },
    ]);
    setText((prior: any) => [
      // 같은 인덱스 들어갈 내용.
      ...prior,
      {
        textEditVisible: false,
        textX: 0,
        fill: 'white',
        textY: 0,
        textValue: newPostIt.postitCONTEXT,
        fontSize: 8,
        width: 400,
        fontStyle: 'bold',
        align: 'left',
        id: refPostItID.current,
      },
    ]);
    setPostItID((p) => p + 1);
    console.log(`In takeNewPostIt - postItID ${postItID}`);
    console.log(`takeNewPostIt ended! ${JSON.stringify(postIts)}`);
  };
  // 😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
  //
  //
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결   서버 연결
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  React.useEffect(() => {
    sockJS = new SockJS(`http://${IP}:8080/meetin`);
    stompClient = Stomp.over(sockJS);
    //
    //
    //
    //
    stompClient.connect({}, () => {
      // 1. 방 입장할 때 참가자 리스트 - enterroom
      // 들어와 있는 사람만 받는 주소. 새로 들어온 사람이 누군지 리스트 받음.
      // eslint-disable-next-line no-unused-vars
      stompClient.subscribe(`/topic/enterroom/${roomID}`, (ptUser) => {
        const newUser = JSON.parse(ptUser.body);
        setPtList((prior: any) =>
          // eslint-disable-next-line no-unused-expressions
          [...prior, { userNAME: newUser.object.userNAME }],
        );
      });
      //
      //
      //
      //
      // 2. 다음단계 알려주는 구독라인 - 호스트만 버튼 볼 수 있어서 호스트만 정보 던질 수 있음
      stompClient.subscribe(`/topic/move/nextstep/${roomID}`, (message) => {
        const newMessage = JSON.parse(message.body);
        const step = newMessage.object.meetStep;
        if (step === 'FIRST') {
          setPostIts([]);
        }
        setOldStage((prior) => [...prior, refPostIt.current]);
        setOldText((prior) => [...prior, refText.current]);
        setPostIts([]);
        setText([]);
        setPostItID(0);
        if (step === 'FIRST') {
          setStages({ scale: 1, x: 0, y: 0 });
          setLevel(0);
          setLatestLevel(0);
        } else if (step === 'SECOND') {
          setStages({ scale: 1, x: 0, y: 0 });
          setLevel(1);
          setLatestLevel(1);
        } else if (step === 'THIRD') {
          setStages({ scale: 1, x: 0, y: 0 });
          setLevel(2);
          setLatestLevel(2);
        } else if (step === 'FOURTH') {
          setStages({ scale: 1, x: 0, y: 0 });
          setLevel(3);
          setLatestLevel(3);
        } else if (step === 'FIFTH') {
          setStages({ scale: 1, x: 0, y: 0 });
          setLevel(4);
          setLatestLevel(4);
        } else if (step === 'SIXTH') {
          setStages({ scale: 0.4, x: 0, y: 0 });
          let count = 0;
          refOldStage.current.forEach((e, index) => {
            e.forEach((k, i) => {
              setPostIts((prior) => [
                ...prior,
                {
                  x: (i % 3) * 150 + 50 + (index - 1) * 640,
                  y: (i / 3) * 150 + 50,
                  id: count,
                  width: k.width,
                  height: k.height,
                  fill: k.fill,
                  shadowBlur: k.shadowBlur,
                },
              ]);
              count += 1;
            });
          });
          count = 0;
          refOldText.current.forEach((e) => {
            e.forEach((k) => {
              setText((prior) => [
                ...prior,
                {
                  textEditVisible: false,
                  textX: 0,
                  fill: 'white',
                  textY: 0,
                  textValue: k.textValue,
                  fontSize: 8,
                  width: k.width,
                  fontStyle: 'bold',
                  align: 'left',
                  id: count,
                },
              ]);
              count += 1;
            });
          });
          setLevel(5);
          setLatestLevel(5);
        } else if (step === 'SEVENTH') {
          setStages({ scale: 1, x: 0, y: 0 });
          setLevel(6);
          setLatestLevel(6);
        }
        changeOpen();
      });
      //
      //
      //
      //
      // 3. 포스트잇 위치
      stompClient.subscribe(`/topic/move/postit/${roomID}`, (postIt) => {
        const newMessage = JSON.parse(postIt.body);
        // 하나씩만 보낼꺼니까 일단 list[0]만 받는다.
        const newPostIt = newMessage.object[0];
        // undefined === 새로 생성 리스트 마지막에 추가
        if (newPostIt.postitID === -1) {
          takeNewPostIt(newPostIt);
          console.log(`In useEffect - postItID ${postItID}`);
        } else {
          movePostIt(newPostIt);
        }
      });
    });
  }, []);
  // 😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
  //
  //
  //----------------------------------------------------------------------------------------------------------------------------------------------
  // 단계 연결 서버 통신  단계 연결 서버 통신  단계 연결 서버 통신  단계 연결 서버 통신  단계 연결 서버 통신  단계 연결 서버 통신  단계 연결 서버 통신
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  const start = () => {
    stompClient.send(`/app/move/nextstep/${roomID}`, {}, JSON.stringify({ meetStep: 'BEFORE_START' }));
  };
  const sendNextLevel = (levels) => {
    let coLevel;
    if (levels === 0) {
      coLevel = 'FIRST';
    } else if (levels === 1) {
      coLevel = 'SECOND';
    } else if (levels === 2) {
      coLevel = 'THIRD';
    } else if (levels === 3) {
      coLevel = 'FOURTH';
    } else if (levels === 4) {
      coLevel = 'FIFTH';
    } else if (levels === 5) {
      coLevel = 'SIXTH';
    } else if (levels === 6) {
      coLevel = 'SEVENTH';
    }
    stompClient.send(`/app/move/nextstep/${roomID}`, {}, JSON.stringify({ meetStep: coLevel }));
  };
  // 😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃😃
  //
  //
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // 리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴  리턴
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.root}>
      <InviteModal inviteOpen={inviteOpen} setInviteOpen={setInviteOpen} roomID={roomID} />
      <RoomNav
        level={level}
        setLevel={setLevel}
        latestLevel={latestLevel}
        setLatestLevel={setLatestLevel}
        title={subject}
        start={start}
        sendNextLevel={sendNextLevel}
        oldStage={oldStage}
        setOldStage={setOldStage}
      />

      <div className={styles.body}>
        {level !== undefined && <FirstModal level={level} open={open} setOpen={setOpen} changeOpen={changeOpen} />}
        <div className={styles.boxandtool}>
          <div className={styles.sandbox}>
            <Stage
              width={windowX * 0.9}
              height={windowY * 0.77}
              draggable
              onWheel={handleWheel}
              onClick={attachPostIt}
              onTouchEnd={attachPostIt}
              scaleX={stages.scale}
              scaleY={stages.scale}
              x={stages.x}
              y={stages.y}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
            >
              <Layer>
                <Text
                  text=""
                  x={x}
                  y={y}
                  draggable
                  onDragEnd={(e) => {
                    setX(e.target.x());
                    setY(e.target.y());
                  }}
                />
                {level === 5 ? (
                  <>
                    <Line points={[0, 0, 3200, 0, 3200, 1500, 0, 1500, 0, 0]} stroke="#a8a2a2" strokeWidth={1} />
                    <Line points={[640, 0, 640, 1500]} stroke="#a8a2a2" strokeWidth={1} />
                    <Line points={[1280, 0, 1280, 1500]} stroke="#a8a2a2" strokeWidth={1} />
                    <Line points={[1920, 0, 1920, 1500]} stroke="#a8a2a2" strokeWidth={1} />
                    <Line points={[2560, 0, 2560, 1500]} stroke="#a8a2a2" strokeWidth={1} />
                    <Line points={[3200, 0, 3200, 1500]} stroke="#a8a2a2" strokeWidth={1} />
                  </>
                ) : (
                  <Line />
                )}
                {level === latestLevel
                  ? postIts?.map((e: any, index: number) => (
                      <PostIt
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        shapeProps={e}
                        isSelected={e.id === selectedId}
                        onSelect={() => {
                          // console.log(`postIt clicked! - all postIts${JSON.stringify(postIts)}`);
                          // console.log(`postIt clicked! - selected ${JSON.stringify(postIts[index])}`);
                          // console.log(`postIt clicked! - postItID state value ${postItID}`);
                          selectShape(e.id);
                          // console.log(`postIt clicked! - all text${JSON.stringify(text)}`);
                        }}
                        onChange={(newAttrs: any) => {
                          stompClient.send(`/app/move/postit/${roomID}`, {}, JSON.stringify([newAttrs]));
                        }}
                        takeState={setText}
                        setPI={setPostIts}
                        PI={level === latestLevel ? postIts : oldStage[level ?? 0 + 1]}
                        text={level === latestLevel ? text : oldText[level ?? 0 + 1]}
                        index={index}
                        user={user}
                        level={level}
                      />
                    ))
                  : oldStage[(level ?? 0) + 1]?.map((e: any, index: number) => (
                      <PostIt
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        shapeProps={e}
                        isSelected={e.id === selectedId}
                        onSelect={() => {
                          // console.log(`postIt clicked! - all postIts${JSON.stringify(postIts)}`);
                          // console.log(`postIt clicked! - selected ${JSON.stringify(postIts[index])}`);
                          // console.log(`postIt clicked! - postItID state value ${postItID}`);
                          selectShape(e.id);
                          // console.log(`postIt clicked! - all text${JSON.stringify(text)}`);
                        }}
                        onChange={(newAttrs: any) => {
                          stompClient.send(`/app/move/postit/${roomID}`, {}, JSON.stringify([newAttrs]));
                        }}
                        takeState={setText}
                        setPI={setPostIts}
                        PI={level === latestLevel ? postIts : oldStage[(level ?? 0) + 1]}
                        text={level === latestLevel ? text : oldText[(level ?? 0) + 1]}
                        index={index}
                        user={user}
                        level={level}
                      />
                    ))}
              </Layer>
            </Stage>
            {selectedId ? (
              <textarea
                value={text[selectedId ?? 0].textValue}
                style={{
                  display: text[selectedId ?? 0].textEditVisible ? 'inline' : 'none',
                  position: 'absolute',
                  top: `${text[selectedId ?? 0].textY + 122}px`,
                  left: `${text[selectedId ?? 0].textX}px`,
                  width: `${postIts[selectedId ?? 0].width}px`,
                  height: `${postIts[selectedId ?? 0].height}px`,
                  backgroundColor: `${postIts[selectedId ?? 0].fill}`,
                  color: 'white',
                  fontSize: '14.5px',
                  fontWeight: 'bold',
                  wordWrap: 'break-word',
                }}
                onChange={(e) => handleTextEdit(e)}
                onKeyDown={(e) => handleTextareaKeyDown(e)}
              />
            ) : (
              <div />
            )}
          </div>
          <div className={styles.toolbar}>
            <div className={styles.toolbox}>
              <div className={styles.firstLine}>
                <button type="button" onClick={changeIsPostIt}>
                  <img src={toolPost} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolPen} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolHigh} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolEraser} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolGraph} className={styles.toolIcon} alt="d" />
                </button>
              </div>
              <div className={styles.secondLine}>
                <button type="button" onClick={() => {}}>
                  <img src={toolVote} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolImage} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolShape} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolSelector} className={styles.toolIcon} alt="d" />
                </button>
                <button type="button" onClick={() => {}}>
                  <img src={toolTrashCan} className={styles.toolIcon} alt="d" />
                </button>
              </div>
            </div>
            <div className={styles.functionBox}>
              <div style={{ height: 50 }} />
              {user.isHost === 'HOST' ? (
                <Button
                  onClick={() => setInviteOpen(true)}
                  style={{ backgroundColor: '#59d9d9' }}
                  variant="contained"
                  color="inherit"
                  disableElevation
                >
                  다음 단계
                </Button>
              ) : (
                <div style={{ height: 50 }} />
              )}
              <div style={{ height: 45 }} />
              <Invite />
              <PartExit />
            </div>
          </div>
        </div>
        <div className={styles.personList}>
          <div>{host} (호스트)</div>
          {ptList.map((ptUser: any) =>
            // eslint-disable-next-line no-nested-ternary
            ptUser.userNAME === host ? (
              <span />
            ) : ptUser.userNAME === user.name ? (
              <div>{ptUser.userNAME} (나)</div>
            ) : (
              <div>{ptUser.userNAME}</div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
