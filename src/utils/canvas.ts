type Position = { x: number; y: number; };

export class Canvas {
    ctx: CanvasRenderingContext2D;
    position: { x: number; y: number; } | undefined;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.position = undefined;

    }

    DrawBoard() {
        var width = this.ctx.canvas.width - 200;
        var height = this.ctx.canvas.height;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;

        this.ctx.beginPath();
        this.ctx.moveTo(width / 3 + 100, 0);
        this.ctx.lineTo(width / 3 + 100, height);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(2 * width / 3 + 100, 0);
        this.ctx.lineTo(2 * width / 3 + 100, height);
        this.ctx.stroke();

        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0 + 100, height / 3);
        this.ctx.lineTo(width + 100, height / 3);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(0 + 100, 2 * height / 3);
        this.ctx.lineTo(width + 100, 2 * height / 3);
        this.ctx.stroke();
    }

    Draw(piece: 'X' | 'O') {
        return {
            at: (block: number) => {
                let center = blockToCenterPosition(block);
                if (piece === 'X') {
                    this.ctx.beginPath();
                    this.ctx.moveTo(center.x - 25, center.y - 25);
                    this.ctx.lineTo(center.x + 25, center.y + 25);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(center.x - 25, center.y + 25);
                    this.ctx.lineTo(center.x + 25, center.y - 25);
                    this.ctx.stroke();
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc(center.x, center.y, 25, 0, 2 * Math.PI);
                    this.ctx.stroke();
                }
            }
        }
    }

    PlayerDraw(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const posi =  getOffSetPosition(e, this.ctx.canvas.getBoundingClientRect());
        this.ctx.beginPath();
        this.ctx.moveTo(this.position!.x, this.position!.y);
        this.ctx.lineTo(posi.x, posi.y);
        this.ctx.stroke();
        this.position = posi;
    }

}

function getOffSetPosition(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, rec: DOMRect): Position {
    const rect = rec;
    const x = e.clientX - rect!.x;
    const y = e.clientY - rect!.y;
    return { x, y };
  };

function blockToCenterPosition(block: number): Position {
    console.debug(block);
    let x = (block % 3) * 100 + 50;
    let y = Math.floor(block / 3) * 100 + 50;
    x = x + 100
    return { x, y };
}

