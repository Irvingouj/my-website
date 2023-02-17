import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ComputerPlay, DefaultGameBoard, DrawBoard, GameBoard, GameOver, GetWinnerLine, IsGameOver, OffBoard, Player, SquareValue } from "../../utils/tictactoe";
import styles from "./Game.module.css";

interface GameProps { }

export type Position = {
  x: number;
  y: number;
};

var degree: number = -Math.PI;

const Game: FC<GameProps> = () => {
  const [userCurrentSquare, setUserCurrentSquare] = useState<number>(-1);

  const boardref = useRef<GameBoard>(DefaultGameBoard); 
  const board = () => boardref.current;
  const canvasref = useRef<HTMLCanvasElement>(null);
  const userPiece:Player = "X";
  const animationId = useRef<number>(0);

  // draw board
  useEffect(() => {
    const ctx = canvasref.current?.getContext("2d");
    if (ctx) {
      DrawBoard(ctx);
    }
  }, []);


  function getCanvas(): CanvasRenderingContext2D {
    if (!canvasref.current) throw new Error("No canvas");
    return canvasref.current?.getContext("2d")!;
  }

  function getComputerPiece(): SquareValue {
    return 'O';
  }


  const drawComputerMove = (play: number) => {

    const ctx = getCanvas();
    const center = blockToCenterPosition(play);

    animationId.current = window.requestAnimationFrame(() => {
      drawCross(center);
    });
  }

  const drawUserMove = (block: number) => {
    console.log("draw user move: ", block);
    const center = blockToCenterPosition(block);
    animationId.current = window.requestAnimationFrame(() => {
      drawCircle(center);
    });
  }

  const drawCircle = (center: Position) => {
    animationId.current = window.requestAnimationFrame(() => {
      drawCircle(center);
    });
    if (degree > Math.PI) {
      degree = -Math.PI;
      window.cancelAnimationFrame(animationId.current);
      return;
    };
    let d = 0.1;
    const ctx = getCanvas();
    let x = 40 * Math.cos(degree) + center.x;
    let y = 40 * Math.sin(degree) + center.y;

    let x1 = 40 * Math.cos(degree + d) + center.x;
    let y1 = 40 * Math.sin(degree + d) + center.y;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    degree += d;
  }

  const drawCross = (center: Position) => {
    animationId.current = window.requestAnimationFrame(() => {
      drawCross(center);
    });
    if (degree > Math.PI) {
      degree = -Math.PI;
      window.cancelAnimationFrame(animationId.current);
      return;
    };
    let d = 0.05;
    const ctx = getCanvas();
    let x = 0, y = 0, x1 = 0, y1 = 0;


    if (degree < 0) {
      let c = Math.abs(degree / Math.PI);
      let cd = Math.abs((degree + d) / Math.PI);
      x = -(40 * c - 20) + center.x;
      y = -(40 * c - 20) + center.y;
      x1 = -(40 * cd - 20) + center.x;
      y1 = -(40 * cd - 20) + center.y;
    } else {
      let c = Math.abs(degree / Math.PI);
      let cd = Math.abs((degree + d) / Math.PI);
      x = (40 * c - 20) + center.x;
      y = -(40 * c - 20) + center.y;
      x1 = (40 * cd - 20) + center.x;
      y1 = -(40 * cd - 20) + center.y;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    degree += d;
  }

  const drawPath = (start: Position, end: Position) => {
    animationId.current = window.requestAnimationFrame(() => {
      drawPath(start, end);
    });
    if (degree > Math.PI) {
      degree = -Math.PI;
      window.cancelAnimationFrame(animationId.current);
      return;
    };

    let d = 0.05;
    let progress = (degree + Math.PI) / (2 * Math.PI); // progress from 0 to 1
    let progress_d = (degree + Math.PI + d) / (2 * Math.PI); // progress of next step from 0 to 1

    let x = start.x + (end.x - start.x) * progress;
    let y = start.y + (end.y - start.y) * progress;

    let x1 = start.x + (end.x - start.x) * progress_d;
    let y1 = start.y + (end.y - start.y) * progress_d;

    const ctx = getCanvas();
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    degree += d;
  }



  const computerPlay = () => {
    let play = ComputerPlay(board(), 'X');
    // draw computer move
    drawComputerMove(play);
    // update board
    board().squares[play] = getComputerPiece();

    playFinished(getComputerPiece()!);
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const position = getOffSetPosition(e, canvasref);
    const block = positionToBlock(position);
    if (block === -1) return;
    // draw user move
    drawUserMove(block);
    // update board
    board().squares[userCurrentSquare] = userPiece;
    console.log("board: ", board().squares);
    playFinished(userPiece);
  }

  const playFinished = (player: Player) => {

    const gameOver = () => {
      var winningLine = GetWinnerLine(board());
      if (winningLine[0] !== -1 && winningLine[1] !== -1) {
        const [start, end] = winningLineEndPosition(winningLine[0]!, winningLine[1]!);
        animationId.current = window.requestAnimationFrame(() => {
          drawPath(start, end);
        });

      } else if (IsGameOver(board())) {
        alert("Game Over, draw");
      }
    }

    if (IsGameOver(board())) {
      gameOver();
    }
    if (player == userPiece) {
      setTimeout(() => {
        computerPlay();
      }, 2000);
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
          onClick={(e) => { handleClick(e) }}
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

function winningLineEndPosition(block1: number, block2: number): [Position, Position] {
  let block_1_center = blockToCenterPosition(block1);
  let block_2_center = blockToCenterPosition(block2);
  console.info(block_1_center, block_2_center);

  let offset = 40;
  // if the blocks are vertical 
  if (block_1_center.x === block_2_center.x) {
    block_1_center = { x: block_1_center.x, y: block_1_center.y - offset };
    block_2_center = { x: block_2_center.x, y: block_2_center.y + offset };
    return [block_1_center, block_2_center];
  }

  // if the blocks are horizontal
  if (block_1_center.y === block_2_center.y) {
    block_1_center = { x: block_1_center.x + offset, y: block_1_center.y };
    block_2_center = { x: block_2_center.x + offset, y: block_2_center.y };
    return [block_1_center, block_2_center];
  }

  // if the blocks are diagonal
  let increment = Math.cos(Math.PI / 4) * offset;
  if (block_1_center.x < block_2_center.x) {
    block_1_center = { x: block_1_center.x - increment, y: block_1_center.y - increment };
    block_2_center = { x: block_2_center.x + increment, y: block_2_center.y + increment };
    return [block_1_center, block_2_center];
  } else {
    block_1_center = { x: block_1_center.x + increment, y: block_1_center.y - increment };
    block_2_center = { x: block_2_center.x - increment, y: block_2_center.y + increment };
    return [block_1_center, block_2_center];
  }

}

