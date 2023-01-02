import React, { FC, useEffect } from 'react';
import './DrawGraph.css';


interface DrawGraphProps {}

const DrawGraph: FC<DrawGraphProps> = () => {

  return (
    <div className="DrawGraph" >
      <iframe src="./graph/graph.html"
      sandbox='allow-scripts allow-same-origin'
      allowFullScreen
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
