import React, { FC } from 'react';
import styles from './gameIntro.module.css';

interface GameIntroProps {}

const GameIntro: FC<GameIntroProps> = () => (
  <div className="zuopin2">
	<div className="w ww">
		<div className="pc_fl img"><img src="14.png" width="100%" /></div>
		<div className="pc_fr txt">
			<i><img src="img/13.png" /></i>
			<h3>Entry name</h3>
			<p>Tic-Tac-Toe, or Tic-tac-toe, is a game of beads played on a 3-by-3 grid. Similar to gobang, it gets its name from the fact that the board has no borders and the lines are arranged in tic-tac-toe. The only tools required for the game are pen and paper, and then the two players representing O and X take turns to leave marks on the grid (generally speaking, the first player is X). If any three marks form a straight line, the winner will win.</p>
			<a href="#">READ MORE</a>
		</div>
		<div className="clear"></div>
	</div>
</div>
);

export default GameIntro;
