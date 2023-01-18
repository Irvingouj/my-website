
export type Player = 'X' | 'O';
export type SquareValue = Player | null;
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export interface GameBoard {
  squares: [SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue, SquareValue];
}

export const DefaultGameBoard: GameBoard = {
  squares: [null, null, null, null, null, null, null, null, null],
};

// check if a player has won
export const PlayerWins = (board: Array<SquareValue>, player: Player): boolean => {
  
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === player) return true;
      else return false;
    }
  }
  return false;
}

export const GameOver = (board: Array<SquareValue>): boolean => {
  return PlayerWins(board, 'X') || PlayerWins(board, 'O') || board.every((square) => square !== null);
}

export const OWins = (board: Array<SquareValue>): boolean => {
  return PlayerWins(board, 'O');
}

export const XWins = (board: Array<SquareValue>): boolean => {
  return PlayerWins(board, 'X');
}

export function DrawBoard(ctx: CanvasRenderingContext2D) {


  var width = ctx.canvas.width - 200;
  var height = ctx.canvas.height;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(width / 3 + 100, 0);
  ctx.lineTo(width / 3 + 100, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(2 * width / 3 + 100, 0);
  ctx.lineTo(2 * width / 3 + 100, height);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0 + 100, height / 3);
  ctx.lineTo(width + 100, height / 3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0 + 100, 2 * height / 3);
  ctx.lineTo(width + 100, 2 * height / 3);
  ctx.stroke();

}

export const OffBoard = (x: number, y: number): boolean => {
  // console.log(x + ":" + y)
  if (x < 100 || x > 400) return true;
  else return false;
}

export const ComputerPlay = (board:GameBoard,computerPiece:SquareValue): number => {
  const computer = computerPiece;
  const human = computer === 'X' ? 'O' : 'X';
  const emptySquares = board.squares.map((square,index) => square===null? index:null).filter(index => index !== null);

  // if center is empty, take it
  if (board.squares[4] === null) return 4;

  // if computer have two in a row, take it
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i]!;
    const copy = board.squares.slice();
    copy[move] = computer;
    if (PlayerWins(copy, computer!)) {
      return move;
    }
  }
  // if user have two in a row, block them
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i]!;
    const copy = board.squares.slice();
    copy[move] = human;
    if (PlayerWins(copy, human)) {
      return move;
    }
  }


  // if sides are empty, take one
  const sides = [1, 3, 5, 7];
  for (let i = 0; i < sides.length; i++) {
    if (board.squares[sides[i]] === null) return sides[i];
  }

  // return some random move
  return emptySquares[Math.floor(Math.random() * emptySquares.length)]!;

}

export const IsGameOver = (board: GameBoard): boolean => {
  return GameOver(board.squares);
}

export const GetWinnerLine = (board: GameBoard): [number,number] => {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board.squares[a] && board.squares[a] === board.squares[b] && board.squares[a] === board.squares[c]) {
      return [a,c];
    }
  }
  return [-1,-1];
}