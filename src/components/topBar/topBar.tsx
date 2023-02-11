import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { GetText } from '../../utils/TextSource';
import './topBar.css';


interface TopBarProps { }
export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
	e.preventDefault();
	const target = e.currentTarget.getAttribute('href');
	if (target) {
		const targetElement = document.querySelector(target);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	}
};

const TopBar: FC<TopBarProps> = () => {




	return (
		<div className="w indtop">
			<div className="fl logo"><img src="irving-ou.svg" /></div>
			<div className="pc_fr tel"><img src="01.png" />{GetText.phone()}</div>
			<div className="fr menu">
				<a href="#" className="nav__trigger"><span className="nav__icon"></span></a>
				<nav className="nav">
					<div className="nav__list">
						<ul className="cd-accordion-menu animated">
							<li><a href="#">About</a></li>
							<li><a href="#Game" onClick={smoothScroll}>Game</a></li>
							<li><a href="#Chat" onClick={smoothScroll}>Chat</a></li>
							<li><a href="#Links" onClick={smoothScroll}>Links</a></li>
							<li><a href="#Contact" onClick={smoothScroll}>Contact</a></li>
						</ul>
					</div>
				</nav>
			</div>
			<div className="clear"></div>
		</div>
	)
};

export default TopBar;
