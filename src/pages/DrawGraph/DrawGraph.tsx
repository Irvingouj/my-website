import React, { FC, useEffect } from 'react';
import './DrawGraph.css';


interface DrawGraphProps {}

const DrawGraph: FC<DrawGraphProps> = () => {

  // const drawCircle = (x: number, y: number, r: number, color: string) => {
  //   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d')!;
  //   ctx.beginPath();
  //   ctx.arc(x, y, r, 0, 2 * Math.PI);
  //   ctx.fillStyle = color;
  //   ctx.fill();
  // };
  
  // useEffect(() => {
  //   drawCircle(100, 100, 50, 'red');
  // }, []);

  return (
    <div className="DrawGraph" >
      <iframe src="./graph/graph.html"
      sandbox='allow-scripts allow-same-origin'
      allowFullScreen
      scrolling='no'
      frameBorder='0'
      />
    </div>
  );
};



type node = {
  id: number;
}

type link = {
  target: number;
  source: number;
}

type graph = {
  vCount: number;
  eCount: number;
  nodes: node[] ;
  links: link[];
}


export default DrawGraph;
