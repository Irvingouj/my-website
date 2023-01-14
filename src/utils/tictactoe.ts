
export type Player = 'X' | 'O';
export type SquareValue = Player| null;

// check if a player has won
export const PlayerWins = (board:Array<SquareValue>,player:Player):boolean => {
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
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if(board[a] === player) return true;
      else return false;
    }
  }
  return false;
}

export const GameOver = (board:Array<SquareValue>):boolean => {
    return PlayerWins(board, 'X') || PlayerWins(board, 'O') || board.every((square) => square !== null);
}

export const OWins = (board:Array<SquareValue>):boolean => {
    return PlayerWins(board, 'O');
}

export const XWins = (board:Array<SquareValue>):boolean => {
    return PlayerWins(board, 'X');
}



export const ComputerPlay = (board:Array<SquareValue>, index:number, player:SquareValue):Number=> {
    return 1
}


export function DrawBoard(ctx: CanvasRenderingContext2D) {
  

  var width = ctx.canvas.width - 200;
  var height = ctx.canvas.height;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(width / 3+100, 0);
  ctx.lineTo(width / 3+100, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(2*width / 3+100, 0);
  ctx.lineTo(2*width / 3+100, height);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0+100, height / 3);
  ctx.lineTo(width+100, height / 3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0+100, 2*height / 3);
  ctx.lineTo(width+100, 2*height / 3);
  ctx.stroke();

}
    
export const OffBoard = (x:number, y:number):boolean => {
    if(x<100 || x>300) return true;
    else return false;
}