// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { Rect, Transformer, Group, Text } from 'react-konva';

// eslint-disable-next-line no-unused-vars
const PostIt = ({ shapeProps, isSelected, onSelect, onChange, takeState, text, index }: any) => {
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
    takeState([...newTextObj]);
  };

  return (
    <>
      <Group draggable>
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...shapeProps}
          ref={shapeRef}
          onDragEnd={(e) => {
            // const stage: any = e.target.getStage();
            onChange({
              ...shapeProps,
              x: e.target.x(), // / scale.scale - stage.x() / scale.scale,
              y: e.target.y(), // / scale.scale - stage.y() / scale.scale,
            });
          }}
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
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
        <Text
          fontSize={15}
          align="left"
          text={text[index]?.textValue ?? ''}
          x={shapeProps.x}
          y={shapeProps.y}
          wrap="word"
          width={shapeProps.width}
          height={shapeProps.height}
          onClick={onSelect}
          onDblClick={(e) => handleTextDblClick(e)}
          onDragEnd={(e) => {
            // const stage: any = e.target.getStage();
            onChange({
              ...shapeProps,
              x: e.target.x(), // / scale.scale - stage.x() / scale.scale,
              y: e.target.y(), // / scale.scale - stage.y() / scale.scale,
            });
          }}
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
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
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
