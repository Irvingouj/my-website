import React, { FC } from 'react';
import styles from './photoWall.module.css';

interface PhotoWallProps {}

const PhotoWall: FC<PhotoWallProps> = () => (
  <div className="photo">
	<div className="w ww">
		<h2>Photo wall</h2>
		<p>Tic-Tac-Toe, or Tic-tac-toe, is a game of beads played on a 3-by-3 grid. Similar to gobang, it gets its name from the fact that the board has no borders and the lines are arranged in tic-tac-toe. The only tools required for the game are pen and paper, and then the two players representing O and X take turns to leave marks on the grid (generally speaking, the first player is X). If any three marks form a straight line, the winner will win.</p>
		<ul>
			<li><img src="photoWall/pw1.jpg" /></li>
			<li><img src="photoWall/pw2.jpg" /></li>
			<li><img src="photoWall/pw4.jpg" /></li>
			<li><img src="photoWall/pw3 .jpg" /></li>
			<li><img src="photoWall/pw5.jpg" /></li>
			<li><img src="photoWall/pw6.jpg" /></li>
		</ul>
	</div>
</div>
);

export default PhotoWall;
