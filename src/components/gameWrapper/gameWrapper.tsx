import React, { FC } from 'react';
import Game from '../Game/Game';
import "./gameWrapper.css"

interface GameWrapperProps {}

const GameWrapper: FC<GameWrapperProps> = () => (
  <div className="jl_img">
    <Game />
  </div>
);

export default GameWrapper;
