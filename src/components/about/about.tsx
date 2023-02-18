import React, { FC } from 'react';
import { GetText } from '../../utils/TextSource';
import TopBar from '../topBar/topBar';

interface AboutProps { }

const About: FC<AboutProps> = () => (
	<div className="banner">
		<TopBar />
		<div className="w ban_con">
			<div className="pc_fl txt">
				<h1 style={{ fontStyle: 'italic' }} >Hi There, My name is {GetText.name()}</h1>
				<br />
				<br />
				<p style={{ fontSize: '20px', fontStyle: 'oblique', color: 'black' }}>
				Hi there! So excited to see you! I fourth year student from Carleton University with a double major in Math and Computer Science 
				and I'm eager to bring my skills and experience to the next step of my career. I pride myself on being a problem solver with a 
				strong work ethic, and I've received recognition for these qualities from my previous managers and supervisors. I also understand 
				the importance of clear and effective communication and I always strive to deliver on my promises. I am confident in my abilities 
				and I am excited to see what the future holds for me in the technology industry.
				</p>
				<br />
				<p>
					play a game with me! 
				</p>
			</div>
			<div className="pc_fr img"><img src="selfie.png" /></div>
			<div className="clear"></div>
		</div>
	</div>
);

export default About;
