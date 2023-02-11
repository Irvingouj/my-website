import React, { FC } from 'react';
import './LinksWrapper.css';
interface LinksWrapperProps { }

const LinksWrapper: FC<LinksWrapperProps> = () => {

	return (
		<div id="Links">
			
			<div className="w ww zuopin">
				<ul>
					<li className='block'>
						<div className="img"><a href="#"><img src="resume-icon.jpg" /><h3>Resume</h3></a></div>
						<div className="txt">
							<p>
								You looking for a software engineer with a passion for technology? Look no further! I guarantee you that I am the best candidate for the job.
								Hit the download button below to view my resume!.
							</p>
							<a href="Software_Engineer_Resume__8.pdf" download={"Irving's Resume"}>Download</a>
						</div>
					</li>
					<li className='block'>
						<div className="img"><a href="#"><img src="openai-react-logo.png" /><h3>Fun fact about this website</h3></a></div>
						<div className="txt">
							<p>
								This personal portfolio website is designed to showcase my skills and experiences, built using the latest technologies such as React
								and Typescript. And, in keeping with my passion for technology, the site features a chatbox powered by OpenAI, allowing visitors to
								ask me anything and get to know me better. However, if you're looking for my secret OpenAI key, I'm afraid you're out of luck - it's
								safely stored in my backend service using Azure Functions, guarded more closely than the Crown Jewels. And, for those who value their privacy,
								just know that any information shared in the chatbox will be kept confidential. So go ahead, ask away!
							</p><a href="11.png" download={"Irving's Resume"}>READ MORE</a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
};

export default LinksWrapper;
