import React, { FC } from 'react';

interface AboutProps {}

const About: FC<AboutProps> = () => (
  <div className="banner">
	<div className="w indtop">
		<div className="fl logo"><img src="logo.png" /></div>
		<div className="pc_fr tel"><img src="01.png" />+132 459 05 6540</div>
		<div className="fr menu">
			<a href="#" className="nav__trigger"><span className="nav__icon"></span></a>
			<nav className="nav">
				<div className="nav__list">
					<ul className="cd-accordion-menu animated">
						<li className="on"><a href="#">Home</a></li>
						<li><a href="#">About</a></li>
						<li><a href="#">Photo</a></li>
						<li><a href="#">Game</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
				</div>
			</nav>
		</div>
		<div className="clear"></div>
	</div>
	<div className="w ban_con">
		<div className="pc_fl txt">
			<h3>Name<span>******</span></h3>
			<h3>Brief introduction</h3>
			<p>Tic-Tac-Toe, or Tic-tac-toe, is a game of beads played on a 3-by-3 grid. Similar to gobang, it gets its name from the fact that the board has no borders and the lines are arranged in tic-tac-toe. The only tools required for the game are pen and paper, and then the two players representing O and X take turns to leave marks on the grid (generally speaking, the first player is X). If any three marks form a straight line, the winner will win.</p>
		</div>
		<div className="pc_fr img"><img src="02.png" /></div>
		<div className="clear"></div>
	</div>
</div>
);

export default About;
