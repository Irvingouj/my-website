import React, { FC, useEffect, useRef } from "react";
import { findFirstDifference } from "../../utils/arrayUtils";
import { useEffectIf, usePrevious } from "../../utils/hooks";
import { DrawBoard, GameBoard, OffBoard, Result } from "../../utils/tictactoe";
import { Position } from "./Game";
import styles from "./Game.module.css";

interface BoardProps {
    board: GameBoard;
    handleUserClick: (block: number) => void;
    result?:Result;
}


var degree: number = -Math.PI;

const Board: FC<BoardProps> = (prop: BoardProps) => {
    const canvasref = useRef<HTMLCanvasElement>(null);
    const animationId = useRef<number>(0);


    // draw board
    useEffect(() => {
        const ctx = canvasref.current?.getContext("2d");
        if (ctx) {
            DrawBoard(ctx);
        }
    }, []);

    // draw X or O
    usePrevious(prop.board, (prev) => {
        if(prop.result?.finished) return;
        if (!prev) return;
        const [index, value] = findFirstDifference(prev.squares, prop.board.squares)
        if (index === -1) {
            console.warn("No difference found");
        };
        const ctx = canvasref.current?.getContext("2d");
        const position = blockToCenterPosition(index);
        const draw = value === "X" ? drawCross : drawCircle;
        if (!ctx) return;

        animationId.current = requestAnimationFrame(() => {
            draw(position)
        })

    });

    useEffectIf(prop.result?.finished, () => {
        const ctx = canvasref.current?.getContext("2d");
        if (!ctx) return;
        const { winner,finishPosition } = prop.result!;
        const [start, end] = finishPosition!;
        const [pos1,pos2] = winningLineEndPosition(start, end);
        animationId.current = requestAnimationFrame(() => {
            drawPath(pos1,pos2)
        });
        
    }, [prop.result?.finished]);


    function getCanvas(): CanvasRenderingContext2D {
        if (!canvasref.current) throw new Error("No canvas");
        return canvasref.current?.getContext("2d")!;
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

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const block = positionToBlock(getOffSetPosition(e, canvasref));
        if (block === -1) return;
        prop.handleUserClick(block);
    }


    return (
        <canvas
            width={500}
            height={300}
            style={{ width: "500px", height: "300px" }}
            className={styles.board}
            ref={canvasref}
            onClick={handleClick}
        />
    );
};
export default Board;

function blockToCenterPosition(block: number): Position {
    let x = (block % 3) * 100 + 50;
    let y = Math.floor(block / 3) * 100 + 50;
    x = x + 100
    return { x, y };
}

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

function getOffSetPosition(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, canvasref: React.RefObject<HTMLCanvasElement>): Position {
    const rect = canvasref.current?.getBoundingClientRect();
    const x = e.clientX - rect!.x;
    const y = e.clientY - rect!.y;
    return { x, y };
};

function winningLineEndPosition(block1: number, block2: number): [Position, Position] {
    let block_1_center = blockToCenterPosition(block1);
    let block_2_center = blockToCenterPosition(block2);
    console.info(block_1_center, block_2_center);

    let offset = 100;
    // if the blocks are vertical 
    if (block_1_center.x === block_2_center.x) {
        block_1_center = { x: block_1_center.x, y: block_1_center.y - offset };
        block_2_center = { x: block_2_center.x, y: block_2_center.y + offset };
        return [block_1_center, block_2_center];
    }

    // if the blocks are horizontal
    if (block_1_center.y === block_2_center.y) {
        block_1_center = { x: block_1_center.x - offset/2, y: block_1_center.y };
        block_2_center = { x: block_2_center.x + offset/2, y: block_2_center.y };
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


