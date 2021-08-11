// eslint-disable-next-line no-unused-vars
import shape from '@material-ui/core/styles/shape';
import React, { useEffect, useRef } from 'react';
import { Rect, Transformer, Group, Text } from 'react-konva';

// eslint-disable-next-line no-unused-vars
const PostIt = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  takeState,
  text,
  index,
  setPI,
  PI,
  user,
  // eslint-disable-next-line no-unused-vars
  level,
}: any) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTextDblClick = (e: any) => {
    const absPos = e.target.getAbsolutePosition();
    const newTextObj = [...text];
    newTextObj[index].textEditVisible = true;
    newTextObj[index].textX = absPos.x;
    newTextObj[index].textY = absPos.y;
    console.log(`textX : ${absPos.x}`);
    console.log(`textY : ${absPos.y}`);

    takeState([...newTextObj]);
  };

  return (
    <>
      <Group
        draggable
        x={0}
        y={0}
        width={0}
        height={0}
        // width={shapeProps.width}
        // height={shapeProps.height}
        onDragEnd={(e) => {
          console.log(shapeProps.x + e.target.x());
          console.log(shapeProps.y + e.target.y());
          const temp = PI.slice();
          if (level === 5) {
            const tempX = shapeProps.x + e.target.x();
            const tempY = shapeProps.y + e.target.y();
            if (tempX > 0 && tempX < 640 && tempY > 0 && tempY < 1500) {
              // eslint-disable-next-line no-param-reassign
              shapeProps.fill = '#386bff';
            } else if (tempX > 640 && tempX < 1280 && tempY > 0 && tempY < 1500) {
              // eslint-disable-next-line no-param-reassign
              shapeProps.fill = '#2ac785';
            } else if (tempX > 1280 && tempX < 1920 && tempY > 0 && tempY < 1500) {
              // eslint-disable-next-line no-param-reassign
              shapeProps.fill = '#ff3865';
            } else if (tempX > 1920 && tempX < 2560 && tempY > 0 && tempY < 1500) {
              // eslint-disable-next-line no-param-reassign
              shapeProps.fill = '#eacd00';
            } else if (tempX > 2560 && tempX < 3200 && tempY > 0 && tempY < 1500) {
              // eslint-disable-next-line no-param-reassign
              shapeProps.fill = 'BLACK';
            }
          }
          temp[index] = {
            width: shapeProps.width,
            height: shapeProps.height,
            fill: shapeProps.fill,
            shadowBlur: shapeProps.shadowBlur,
            id: shapeProps.id,
            x: shapeProps.x + e.target.x(),
            y: shapeProps.y + e.target.y(),
          };
          setPI([...temp]);

          onChange({
            locationX: shapeProps.x + e.target.x(),
            locationY: shapeProps.y + e.target.y(),
            width: shapeProps.width,
            height: shapeProps.height,
            postitCONTEXT: text[index].textValue,
            postitCOLOR: shapeProps.fill,
            postitID: shapeProps.id,
            user: { userNAME: user.name, id: user.id },
          });
          e.target.x(0);
          e.target.y(0);
        }}
      >
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          width={shapeProps.width}
          height={shapeProps.height}
          fill={shapeProps.fill}
          id={shapeProps.id}
          x={shapeProps.x}
          y={shapeProps.y}
          shadowBlur={shapeProps.shadowBlur}
          ref={shapeRef}
          // eslint-disable-next-line no-unused-vars
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            const temp = PI.slice();
            temp[index] = {
              width: Math.max(50, node.width() * scaleX),
              height: Math.max(50, node.height() * scaleY),
              fill: shapeProps.fill,
              shadowBlur: shapeProps.shadowBlur,
              id: shapeProps.id,
              x: e.target.x(),
              y: e.target.y(),
            };
            setPI([...temp]);
            onChange({
              locationX: e.target.x(),
              locationY: e.target.y(),
              width: Math.max(50, node.width() * scaleX),
              height: Math.max(50, node.height() * scaleY),
              postitCONTEXT: text[index].textValue,
              postitCOLOR: shapeProps.fill,
              postitID: shapeProps.id,
              user: { userNAME: user.name, id: user.id },
            });
            console.log(`text resize xPos ${e.target.x()}`);
          }}
        />
        <Text
          fontSize={15}
          align="left"
          text={text[index]?.textValue ?? ''}
          width={shapeProps.width}
          height={shapeProps.height}
          fill="#f9f9f9"
          fontStyle="BOLD"
          x={shapeProps.x}
          y={shapeProps.y + 3}
          wrap="word"
          onClick={onSelect}
          onDblClick={(e) => handleTextDblClick(e)}
          // eslint-disable-next-line no-unused-vars

          // eslint-disable-next-line no-unused-vars
        />
      </Group>
      {isSelected && (
        <Transformer
          rotateEnabled={false}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 100 || newBox.height < 100) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default PostIt;
