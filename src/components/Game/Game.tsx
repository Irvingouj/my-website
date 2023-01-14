import { line } from "d3";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { DrawBoard, GameOver, SquareValue } from "../../utils/tictactoe";
import styles from "./Game.module.css";

interface GameProps {}

type Position = {
  x: number;
  y: number;
};

const Game: FC<GameProps> = () => {
  const [board, setBoard] = useState(Array<SquareValue>(9).fill(null));
  const [drawing, setDrawing] = useState(false);
  const [flip, setFlip] = useState(false);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [src , setSrc] = useState<string>('undefined');

  const canvasref = useRef<HTMLCanvasElement>(null);

  const paint = useCallback(
    (e: MouseEvent) => {
      if (!drawing) return;
      const ctx = canvasref.current?.getContext("2d");
      if (!ctx) throw new Error("No canvas context");
      const posi = getOffSetPosition(e,canvasref);
      ctx.beginPath();
      ctx.moveTo(position!.x, position!.y);
      ctx.lineTo(posi.x, posi.y);
      ctx.stroke();
      console.debug(posi);
      setPosition(posi);
    },
    [drawing, position]
  );

  useEffect(() => {
    return mouseUp(canvasref, setDrawing);
  }, [drawing]);

  useEffect(() => {
    return mouseDown(canvasref, startDrawing);
  }, [drawing]);

  useEffect(() => {
    return paintListener(canvasref, paint);
  }, [paint]);

  const startDrawing = (e: MouseEvent) => {
    const posi = getOffSetPosition(e,canvasref);
    setPosition(posi);
    setDrawing(true);
  };



  useEffect(() => {
    const ctx = canvasref.current?.getContext("2d");
    if (ctx) {
      DrawBoard(ctx);
    }
  }, []);

  return (
    <div className={styles.game}>
      <div className={styles.boardWrapper}>
        <canvas
          width={300}
          height={300}
          style={{ width: "300px", height: "300px" }}
          className={styles.board}
          ref={canvasref}
        />
        {/* <img src ={src} alt ={"loading"}  /> */}
      </div>
    </div>
  );
};
export default Game;

function mouseUp(
  canvasref: React.RefObject<HTMLCanvasElement>,
  setDrawing: React.Dispatch<React.SetStateAction<boolean>>
) {
  const ctx = canvasref.current?.getContext("2d");
  if (!ctx) throw new Error("No canvas context");
  canvasref.current?.addEventListener("mouseup", (e) => {
    setDrawing(false);
  });
  
  return () => {
    canvasref.current?.removeEventListener("mouseup", (e) => {
      setDrawing(false);
      
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

