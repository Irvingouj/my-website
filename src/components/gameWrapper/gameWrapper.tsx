import React, { FC } from 'react';
import Game from '../Game/Game';
import "./gameWrapper.css"

interface GameWrapperProps {}

const GameWrapper: FC<GameWrapperProps> = () => (
  <div className="jl_img" id="Game">
    <Game />
  </div>
);

export default GameWrapper;
