import React, { FC, useRef, useState } from 'react';
import { SquareValue } from '../../utils/tictactoe';
import { Position } from '../Game/Game';
import './CanvasDrawer.css';

interface CanvasDrawerProps { }

const CanvasDrawer: FC<CanvasDrawerProps> = () => {
  // const [board, setBoard] = useState<GameBoard>(DefaultGameBoard);
  
  const drawing = useRef(false);
  const canvasref = useRef<HTMLCanvasElement>(null);
  const userEndInputTimer = useRef<NodeJS.Timeout>();
  const position = useRef<Position | undefined>(undefined);


  // start drawing handler
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

  };

  // end drawing handler
  const endDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

  }

  //draw handler
  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    let ctx = canvasref.current?.getContext("2d")!;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';

    console.log(position.current!.x, position.current!.y);

    ctx.moveTo(position.current!.x, position.current!.y); // from
    setPosition(e);
    ctx.lineTo(position.current!.x, position.current!.y); // to

    ctx.stroke(); // draw it!
  }

  function setPosition(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    position.current!.x = e.clientX;
    position.current!.y = e.clientY;
  }

  return (
    <div className="CanvasDrawer">
      <canvas
        className='canvas'
        width={500}
        height={300}
        style={{ width: "500px", height: "300px" }}
        ref={canvasref}
        onMouseDown={(e) => {  drawing.current = true; position.current = {x: e.clientX, y: e.clientY} }}
        onMouseUp={(e) => {  drawing.current = false }}
        onMouseMove={(e) => {
          if (drawing) {
            draw(e)
          }
        }}

      />
      <div style={{width:1000, height:10, background:'black'}}/>
      <canvas
        className='canvas'
        width={500}
        height={300}
        style={{ width: "500px", height: "300px" }}
        ref={canvasref}
      />

    </div>
  )
}

export default CanvasDrawer;
