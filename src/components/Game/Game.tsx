import { line } from "d3";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { DrawBoard, GameOver, OffBoard, SquareValue } from "../../utils/tictactoe";
import styles from "./Game.module.css";

interface GameProps {}

type Position = {
  x: number;
  y: number;
};

const Game: FC<GameProps> = () => {
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [userCanDraw, setUserCanDraw] = useState<boolean>(true);
  const [firstDrawMake, setFirstDrawMade] = useState<boolean>(false);
  const [userEndInputTimer, setUserEndInputTimer] = useState<NodeJS.Timeout>();
  const [computerMove, setComputerMove] = useState<boolean>(false);
  const [blockOfDrawing, setBlockOfDrawing] = useState<number>(-1);

  const canvasref = useRef<HTMLCanvasElement>(null);

  function getCanvas(): CanvasRenderingContext2D {
    if (!canvasref.current) throw new Error("No canvas");
    return canvasref.current?.getContext("2d")!;
  }

  const paint = useCallback(
    (e: MouseEvent) => {
      if (!drawing) return;
      if (OffBoard(position?.x!,position?.y!)) return;
      if(notInBlockOfDrawing(blockOfDrawing,position?.x!,position?.y!)) return;
      const ctx = getCanvas()
      const posi = getOffSetPosition(e,canvasref);
      ctx.beginPath();
      ctx.moveTo(position!.x, position!.y);
      ctx.lineTo(posi.x, posi.y);
      ctx.stroke();
      // console.debug(posi);
      setPosition(posi);
    },
    [drawing, position]
  );

  // mouse up listener
  useEffect(() => {
      return mouseUp(canvasref, endDrawing);
  }, []);

  // mouse down listener
  useEffect(() => {
    return mouseDown(canvasref, startDrawing);
  }, []);

  // paint listener
  useEffect(() => {
    if(userCanDraw){
      setFirstDrawMade(true);
      return paintListener(canvasref, paint);
    }
  }, [paint]);

  // user end input timer
  useEffect(() => {
    const userEndInputTimerStart = () => setTimeout(() => {
      setUserCanDraw(false);
      setComputerMove(true);
    }, 2000);
    clearTimeout(userEndInputTimer);
    if(!drawing && firstDrawMake){
      const timer = userEndInputTimerStart();
      setUserEndInputTimer(timer);
    }
  },[drawing]);

  // draw board
  useEffect(() => {
    const ctx = canvasref.current?.getContext("2d");
    if (ctx) {
      DrawBoard(ctx);
    }
  }, []);

  // computer move
  useEffect(() => {
    if(computerMove){
      const canvas = getCanvas();
        // get user move square
        // compute computer move square
        // draw computer move
        // check game over
        // if game over, show game over
        // else, set userCanDraw to true
      
    }
  },[computerMove]);


  // start drawing handler
  const startDrawing = (e: MouseEvent) => {
    const posi = getOffSetPosition(e,canvasref);
    setPosition(posi);
    setDrawing(true);
  };

  // end drawing handler
  const endDrawing = (e:MouseEvent) => {
    const posi = getOffSetPosition(e,canvasref);
    setPosition(posi);
    setDrawing(false);
  }




  
  return (
    <div className="Game">
      <div className="BoardWrapper">
        <canvas
          width={500}
          height={300}
          style={{ width: "500px", height: "300px" }}
          className={styles.board}
          ref={canvasref}
        />
      </div>
    </div>
  );
};
export default Game;

function mouseUp(
  canvasref: React.RefObject<HTMLCanvasElement>,
  endDrawing: (e:MouseEvent) => void
) {
  const ctx = canvasref.current?.getContext("2d");
  if (!ctx) throw new Error("No canvas context");
  canvasref.current?.addEventListener("mouseup", (e) => {
    endDrawing(e);
  });

  // console.debug("mouse up");
  
  return () => {
    canvasref.current?.removeEventListener("mouseup", (e) => {
      endDrawing(e);
    });
  };
}

function mouseDown(
  canvasref: React.RefObject<HTMLCanvasElement>,
  startDrawing: (e: MouseEvent) => void
) {
  const ctx = canvasref.current?.getContext("2d");
  if (!ctx) throw new Error("No canvas context");
  canvasref.current?.addEventListener("mousedown", startDrawing);
  return () => {
    canvasref.current?.removeEventListener("mousedown", startDrawing);
  };
}

function paintListener(
  canvasref: React.RefObject<HTMLCanvasElement>,
  paint: (e: MouseEvent) => void
) {
  if (!canvasref.current) {
    return;
  }
  const canvas: HTMLCanvasElement = canvasref.current;
  canvas.addEventListener("mousemove", paint);
  return () => {
    canvas.removeEventListener("mousemove", paint);
  };
}

function getOffSetPosition(e: MouseEvent,canvasref: React.RefObject<HTMLCanvasElement>): Position{
  const rect = canvasref.current?.getBoundingClientRect();
  const x = e.clientX - rect!.x;
  const y = e.clientY - rect!.y;
  return { x, y };
};

function notInBlockOfDrawing(block:number,x:number,y:number):boolean{
  return false;
}

function positionToBlock(x:number,y:number):number{
    let xBlock = Math.floor(x/100);
    let yBlock = Math.floor(y/100);
    return -1;
}
