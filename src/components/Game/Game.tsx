import { line } from "d3";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "../../utils/canvas";
import { ComputerPlay, DefaultGameBoard, DrawBoard, GameBoard, GameOver, GetWinnerLine, IsGameOver, OffBoard, SquareValue } from "../../utils/tictactoe";
import styles from "./Game.module.css";

interface GameProps { }

type Position = {
  x: number;
  y: number;
};


const Game: FC<GameProps> = () => {
  const [board, setBoard] = useState<GameBoard>(DefaultGameBoard);
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [userEndInputTimer, setUserEndInputTimer] = useState<NodeJS.Timeout>();
  const [userCurrentSquare, setUserCurrentSquare] = useState<number>(-1);
  const [userPiece, setUserPiece] = useState<SquareValue>("X");

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
    console.debug(board.squares);
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
    ctx.beginPath();
    ctx.arc(center.x, center.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
  }

  const gameOver = () => {
    const ctx = getCanvas();
    var winningLine = GetWinnerLine(board);
    if (winningLine[0]!==-1 && winningLine[1]!==-1) {
      ctx.beginPath();
      const start = blockToCenterPosition(winningLine[0]);
      const end = blockToCenterPosition(winningLine[1]);
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }else if (IsGameOver(board)) {
        alert("Game Over, draw");
    }
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


