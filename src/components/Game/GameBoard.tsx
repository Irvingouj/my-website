import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { DrawBoard, GameBoard } from "../../utils/tictactoe";
import styles from "./Game.module.css";

interface GameProps {
    board: GameBoard;
}

export type Position = {
    x: number;
    y: number;
};

var degree: number = -Math.PI;

function useComponentDidMountOrUpdate<F extends Function, T>(effect: F, deps: T) {
    const prev = React.useRef<T>(deps)

    React.useEffect(
        () => {
            const unmountHandler = effect(prev.current)
            prev.current = deps
            return unmountHandler
        },
        [deps]
    )
}

const GameBoard: FC<GameProps> = (prop: GameProps) => {
    const canvasref = useRef<HTMLCanvasElement>(null);
    const animationId = useRef<number>(0);

    // draw board
    useEffect(() => {

        const ctx = canvasref.current?.getContext("2d");
        if (ctx) {
            DrawBoard(ctx);
        }
    }, []);

    useComponentDidMountOrUpdate((prev:typeof prop.board) => {
        prop.board.squares.forEach((value, index) => {
            if (value!== prev.squares[index]){
                if (value === "X") {
                    drawCross(blockToCenterPosition(index));
                } else if (value === "O") {
                    drawCircle(blockToCenterPosition(index));
                }
                return;
            }
        });
    }, [prop.board]);

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
    }


    return (
        <canvas
            width={500}
            height={300}
            style={{ width: "500px", height: "300px" }}
            className={styles.board}
            ref={canvasref}
            onClick={(e) => { handleClick(e) }}
        />
    );
};
export default GameBoard;

function blockToCenterPosition(block: number): Position {
    console.debug(block);
    let x = (block % 3) * 100 + 50;
    let y = Math.floor(block / 3) * 100 + 50;
    x = x + 100
    return { x, y };
  }
  