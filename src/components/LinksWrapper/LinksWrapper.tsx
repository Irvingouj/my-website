import React, { FC } from 'react';
import './LinksWrapper.css';
interface LinksWrapperProps { }

const LinksWrapper: FC<LinksWrapperProps> = () => (
	<div>
		<div className='absolute'>
			<h1> this section is under construction </h1>
		</div>
		<div className="w ww zuopin underConstruction">
			<ul>
				<li>
					<div className="img"><a href="#"><img src="10.jpg" /><h3>Entry name</h3></a></div>
					<div className="txt">
						<p>Tic-Tac-Toe, or Tic-tac-toe, is a game of beads played on a 3-by-3 grid. Similar to gobang, it gets its name from the fact that the board has no borders and the lines are arranged in tic-tac-toe. The only tools required for the game are pen and paper...</p>
						<a href="#">READ MORE</a>
					</div>
				</li>
				<li>
					<div className="img"><a href="#"><img src="11.jpg" /><h3>Entry name</h3></a></div>
					<div className="txt">
						<p>Tic-Tac-Toe, or Tic-tac-toe, is a game of beads played on a 3-by-3 grid. Similar to gobang, it gets its name from the fact that the board has no borders and the lines are arranged in tic-tac-toe. The only tools required for the game are pen and paper...</p>
						<a href="#">READ MORE</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
);

export default LinksWrapper;
