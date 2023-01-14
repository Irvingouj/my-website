import React, { FC } from 'react';
import styles from './topBar.module.css';

interface TopBarProps {}

const TopBar: FC<TopBarProps> = () => (
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
);

export default TopBar;
