import React from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import Frame from '../common/frame';
import styles from './index.module.css';

function Room() {
  return (
    <Frame>
      <div className={styles.body}>
        <div className={styles.sandbox}>
          <Stage width={window.innerWidth * 0.9} height={window.innerHeight * 0.9} draggable>
            <Layer>
              <Text text="im 100 100" x={100} y={100} />
              <Text text="im 100 100" x={-100} y={100} />
              <Star id="2" x={100} y={100} numPoints={5} innerRadius={20} outerRadius={40} />
            </Layer>
          </Stage>
        </div>
        <div className={styles.toolbar}>toolbar</div>
      </div>
    </Frame>
  );
}

export default Room;
