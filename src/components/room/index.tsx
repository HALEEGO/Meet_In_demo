import React, { useState } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';
import styles from './index.module.css';
import RoomNav from './roomNav';

function Room() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [stages, setStages] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [isPostIt, setPostIt] = useState(false);
  const [shape, setShape] = useState([
    <Text
      text="im 100 100"
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => {
        setX(e.target.x());
        setY(e.target.y());
      }}
    />,
  ]);
  // const [rect, setRect] = useState(0);
  const windowX = window.innerWidth;
  const windowY = window.innerHeight;

  const changeIsPostIt = () => {
    setPostIt(!isPostIt);
  };

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

  const attachPostIt = (e: any) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (isPostIt) {
      setShape((prior) => [
        ...prior,
        <Rect
          x={stage.getPointerPosition().x / stages.scale - stage.x() / stages.scale}
          y={stage.getPointerPosition().y / stages.scale - stage.y() / stages.scale}
          width={100}
          height={100}
          fill="yellow"
          shadowBlur={8}
          opacity={0.8}
          draggable
        />,
      ]);
    }
  };

  return (
    <div className={styles.root}>
      <RoomNav />
      <div className={styles.body}>
        <div className={styles.boxandtool}>
          <div className={styles.sandbox}>
            <Stage
              width={windowX * 0.9}
              height={windowY * 0.8}
              draggable
              onWheel={handleWheel}
              onClick={attachPostIt}
              scaleX={stages.scale}
              scaleY={stages.scale}
              x={stages.x}
              y={stages.y}
            >
              <Layer>{shape.map((e) => e)}</Layer>
            </Stage>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.toolbox}>
              <button type="button" onClick={changeIsPostIt}>
                포스트잇
              </button>
              <button type="button" onClick={changeIsPostIt}>
                펜
              </button>
              <button type="button" onClick={changeIsPostIt}>
                형광펜
              </button>
              <button type="button" onClick={changeIsPostIt}>
                지우개
              </button>
              <button type="button" onClick={changeIsPostIt}>
                그래프
              </button>
              <button type="button" onClick={changeIsPostIt}>
                찬반투표
              </button>
              <button type="button" onClick={changeIsPostIt}>
                이미지
              </button>
              <button type="button" onClick={changeIsPostIt}>
                도형
              </button>
              <button type="button" onClick={changeIsPostIt}>
                멀티셀렉터
              </button>
              <button type="button" onClick={changeIsPostIt}>
                휴지통
              </button>
            </div>
            <div className={styles.functionBox}>
              <button type="button" onClick={changeIsPostIt}>
                초대하기
              </button>
              <button type="button" onClick={changeIsPostIt}>
                나가기
              </button>
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
