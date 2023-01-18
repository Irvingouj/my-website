import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ComputerPlay, DefaultGameBoard, DrawBoard, GameBoard, GameOver, IsGameOver, OffBoard, SquareValue } from "../../utils/tictactoe";
import styles from "./Game.module.css";

interface GameProps { }

type Position = {
  x: number;
  y: number;
};

var degree:number = -Math.PI;

const Game: FC<GameProps> = () => {
  const [board, setBoard] = useState<GameBoard>(DefaultGameBoard);
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [userEndInputTimer, setUserEndInputTimer] = useState<NodeJS.Timeout>();
  const [userCurrentSquare, setUserCurrentSquare] = useState<number>(-1);
  const [userPiece, setUserPiece] = useState<SquareValue>("X");
  const [useStrokeNumer, setUseStrokeNumer] = useState<number>(0);

  const canvasref = useRef<HTMLCanvasElement>(null);

  function getCanvas(): CanvasRenderingContext2D {
    if (!canvasref.current) throw new Error("No canvas");
    return canvasref.current?.getContext("2d")!;
  }

  function getComputerPiece(): SquareValue {
    return userPiece === "X" ? "O" : "X";
  }



  // draw board
  useEffect(() => {
    const ctx = canvasref.current?.getContext("2d");
    if (ctx) {
      DrawBoard(ctx);
    }
  }, []);





  // start drawing handler
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const posi = getOffSetPosition(e, canvasref);
    clearTimeout(userEndInputTimer!);
    // console.debug(posi);
    setPosition(posi);
    setUserCurrentSquare(positionToBlock(posi));
    setDrawing(true);
  };

  // end drawing handler
  const endDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const posi = getOffSetPosition(e, canvasref);
    setPosition(posi);
    setDrawing(false);
    updateBoard();
    
    // computer play
    setUserEndInputTimer(setTimeout(() => {
      if (IsGameOver(board)) {
        gameOver();
        return;
      }
      computerPlay();
    }, 2000));
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!drawing) return;
    if (OffBoard(position?.x!, position?.y!)) return;
    // if(notInBlockOfDrawing(blockOfDrawing,position?.x!,position?.y!)) return;
    const ctx = getCanvas()
    const posi = getOffSetPosition(e, canvasref);
    ctx.beginPath();
    ctx.moveTo(position!.x, position!.y);
    ctx.lineTo(posi.x, posi.y);
    ctx.stroke();
    // console.debug(posi);
    setPosition(posi);
  }


  const drawComputerMove = (play: number) => {
    
    const ctx = getCanvas();
    const center = blockToCenterPosition(play);

  // draw circle with animation
    // ctx.beginPath();
    // ctx.arc(center.x, center.y, 40, 0, 2 * Math.PI);
    // ctx.stroke();
    drawCircle(center);
  }

  const drawCircle = (center: Position) => {
    window.requestAnimationFrame(() => {
      drawCircle(center);
    });
    if(degree > Math.PI) {
      degree = -Math.PI;
      return;
    };
    let d = 0.1;
    const ctx = getCanvas();
    let x = 40*Math.cos(degree) + center.x;
    let y = 40*Math.sin(degree) + center.y;

    let x1 = 40*Math.cos(degree+d) + center.x;
    let y1 = 40*Math.sin(degree+d) + center.y;
    console.debug(x,y,x1,y1);

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1);
    ctx.stroke();
    degree += d;
  }


  const gameOver = () => {
    const ctx = getCanvas();
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 10, 50);
  }

  const updateBoard = () => {
    board.squares[userCurrentSquare] = userPiece;
    console.debug(board);
    setBoard(board);
  }

  

  const computerPlay = () => {
    let play = ComputerPlay(board, getComputerPiece());
    // draw computer move
    drawComputerMove(play);
    // update board
    board.squares[play] = getComputerPiece();
    setBoard(board);
    // check game over
    if (IsGameOver(board)) {
      // show game over
      gameOver();
    }
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
          onMouseDown={(e) => { startDrawing(e) }}
          onMouseUp={(e) => { endDrawing(e) }}
          onMouseMove={(e) => {
            if (drawing) {
              draw(e)
            }
          }}

        />
      </div>
    </div>
  );
};
export default Game;


function getOffSetPosition(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, canvasref: React.RefObject<HTMLCanvasElement>): Position {
  const rect = canvasref.current?.getBoundingClientRect();
  const x = e.clientX - rect!.x;
  const y = e.clientY - rect!.y;
  return { x, y };
};

function positionToBlock(position: Position | undefined): number {
  if (!position) return -1;
  if (OffBoard(position.x, position.y)) {
    return -1
  };
  // const offSetPostion = getOffSetPosition(position);
  let xBlock = Math.floor(position.x / 100);
  let yBlock = Math.floor(position.y / 100);
  var block = xBlock + yBlock * 3;
  return block - 1;
}

function blockToCenterPosition(block: number): Position {
  console.debug(block);
  let x = (block % 3) * 100 + 50;
  let y = Math.floor(block / 3) * 100 + 50;
  x = x + 100
  return { x, y };
}

