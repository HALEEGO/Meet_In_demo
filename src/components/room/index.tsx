import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
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

function Room(props: any) {
  const { location } = props;
  console.log(`룸에서 : ${location.state.roomID}`);
  const windowX = window.innerWidth;
  const windowY = window.innerHeight;
  const [x, setX] = useState(50); // 좌표 확인용 텍스트 위치
  const [y, setY] = useState(50); // ''
  const [level, setLevel] = useState<number>();

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

  // ------------ ⬆️ : state ------- ⬇️ : method ---------

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

  // ⬇️ 포스트잇 글씨 관련 메소드들
  // const takeState = (stat: any) => {
  //   setText({ ...stat });
  // };

  // eslint-disable-next-line no-unused-vars
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
          <div>HOST</div>
          <div>part1</div>
          <div>part2</div>
          <div>part3</div>
          <div>part4</div>
          <div>part5</div>
        </div>
      </div>
    </div>
  );
}

export default Room;
