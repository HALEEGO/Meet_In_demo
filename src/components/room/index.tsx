import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
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

type textType = {
  textEditVisible: boolean;
  textX: number;
  fill: string;
  textY: number;
  textValue: string;
  fontSize: number;
  width: number;
  fontStyle: string;
  align: string;
  id: number;
};

let stompClient: Stomp.Client;
let sockJS: WebSocket;

function Room(props: any) {
  const { location } = props;
  console.log(location);

  // eslint-disable-next-line no-unused-vars
  const { roomID, userList, host, isHost, subject } = location.state;
  console.log(`${roomID}`);
  console.log(`유저리스트 0번째 출력해보기 : ${userList}`);
  console.log(host);
  const windowX = window.innerWidth; // 화면 전체 가로 받기
  const windowY = window.innerHeight; // 화면 전체 세로 받기
  // --------------------------------------------------------------------

  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️회의 관련 state⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  const [level, setLevel] = useState<number>(); // 모자 단계 - 초기값 undefined
  // eslint-disable-next-line no-unused-vars
  const [ptList, setPtList] = useState(userList); // 참가자 리스트
  // --------------------------------------------------------------------

  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️ : 콘바 관련 state ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  const [x, setX] = useState(50); // 좌표 확인용 텍스트 위치
  const [y, setY] = useState(50); // ''

  const [stages, setStages] = useState({
    // 스테이지 스케일 및 xy 정보
    scale: 1,
    x: 0,
    y: 0,
  });

  const [isPostIt, setIsPostIt] = useState(false); // 포스트잇 버튼 클릭 했는가

  const [postIts, setPostIts] = useState<Array<object>>([]); // 포스트잇 스타일 리스트

  const [text, setText] = useState<Array<textType>>([]); // 포스트잇 글씨 -> postIts랑 index 번호 같음

  const [postItID, setPostItID] = useState<number>(0); // 포스트잇 아이디

  const [selectedId, selectShape] = React.useState(null); // 클릭시 선택된 포스트잇 아이디

  // ------------------------------------------------------------------------------
  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️ 콘바 관련 method ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️

  // 포스트잇 상태 불리언 바꿔주는 메소드
  const changeIsPostIt = () => {
    setIsPostIt(!isPostIt);
  };

  // 바깥 클릭해서 클릭 해제 되었는가 확인
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

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

  // 포스트잇 붙이기
  const attachPostIt = (e: any) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (isPostIt) {
      setPostIts((prior: any) => [
        // 포스트잇 도형 스타일
        ...prior,
        {
          x: stage.getPointerPosition().x / stages.scale - stage.x() / stages.scale,
          y: stage.getPointerPosition().y / stages.scale - stage.y() / stages.scale,
          id: postItID,
          width: 100,
          height: 100,
          fill: 'yellow',
          shadowBlur: 8,
        },
      ]);
      setText((prior: any) => [
        // 같은 인덱스 들어갈 내용.
        ...prior,
        {
          textEditVisible: false,
          textX: 0,
          fill: 'black',
          textY: 0,
          textValue: 'double click to edit\n\nand enter to finish',
          fontSize: 8,
          width: 400,
          fontStyle: 'normal',
          align: 'left',
          id: postItID,
        },
      ]);
      setPostItID(postItID + 1);
      changeIsPostIt();
    }
  };

  // 입퇴장 관련 버튼
  const Invite = () => (
    <Button style={{ backgroundColor: '#59d9d9' }} variant="contained" color="inherit" disableElevation>
      초대하기
    </Button>
  );

  const PartExit = () => (
    <Button style={{ backgroundColor: '#f25c84' }} variant="contained" color="inherit" disableElevation>
      나가기
    </Button>
  );

  // const HostExit = () => (
  //   <Button variant="contained" color="primary" disableElevation>
  //     나가기 또는 회의 종료
  //   </Button>
  // );

  // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ 포스트잇 글씨 관련 메소드들 ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
  // eslint-disable-next-line no-unused-vars
  // 엔터 누르면 텍스트 에이리어 사라지게 해주기
  const handleTextareaKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // 13 == enter
      const newText = [...text];
      // eslint-disable-next-line no-unused-expressions
      if (selectedId) {
        newText[selectedId ?? 0].textEditVisible = false;
        setText([...newText]);
      }
    }
  };

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

  // --------------------------------------------------------
  // --------------------------------------------------------

  // 서버 연결
  React.useEffect(() => {
    sockJS = new SockJS(`http://${IP}:8080/meetin`);
    stompClient = Stomp.over(sockJS);
    stompClient.connect({}, () => {
      // 1. 방 입장할 때 참가자 리스트 - enterroom
      // 들어와 있는 사람만 받는 주소. 새로 들어온 사람이 누군지 리스트 받음.
      //
      stompClient.subscribe(`topic/enterroom/${roomID}`, () => {
        // const newMessage = JSON.parse(greeting.body);
        // setMessage(newMessage.roomID);
      });
      // 2. 다음단계 알려주는 구독라인 - 호스트만 버튼 볼 수 있어서 호스트만 정보 던질 수 있음
      stompClient.subscribe(`topic/move/nextstep/${roomID}`, () => {
        // const newMessage = JSON.parse(greeting.body);
        // setMessage(newMessage.roomID);
      });
      // 3. 포스트잇 위치
      stompClient.subscribe(`topic/move/postit/${roomID}`, () => {
        // const newMessage = JSON.parse(greeting.body);
        // setMessage(newMessage.roomID);
      });
    });
  }, []);
  // ------------------------------------------------------------------------

  return (
    <div className={styles.root}>
      <RoomNav level={level} setLevel={setLevel} />
      <div className={styles.body}>
        <div className={styles.boxandtool}>
          <div className={styles.sandbox}>
            <Stage
              width={windowX * 0.9}
              height={windowY * 0.77}
              draggable
              onWheel={handleWheel}
              onClick={attachPostIt}
              scaleX={stages.scale}
              scaleY={stages.scale}
              x={stages.x}
              y={stages.y}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
            >
              <Layer>
                <Text
                  text="position checker"
                  x={x}
                  y={y}
                  draggable
                  onDragEnd={(e) => {
                    setX(e.target.x());
                    setY(e.target.y());
                  }}
                />

                {postIts.map((e: any, index: number) => (
                  <PostIt
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    shapeProps={e}
                    isSelected={e.id === selectedId}
                    onSelect={() => {
                      selectShape(e.id);
                    }}
                    onChange={(newAttrs: any) => {
                      const rects = postIts.slice();
                      rects[index] = newAttrs;
                      setPostIts(rects);
                    }}
                    takeState={setText}
                    text={text}
                    index={index}
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
                  top: `${text[selectedId ?? 0].textY}px`,
                  left: `${text[selectedId ?? 0].textX}px`,
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
              <Invite />
              <PartExit />
            </div>
          </div>
        </div>
        <div className={styles.personList}>
          <div>{host}</div>
          {ptList.map((user: any) => (user.userNAME === host ? <span /> : <div>{user.userNAME}</div>))}
        </div>
      </div>
    </div>
  );
}

export default Room;
