import React, { FC } from 'react';
import { GetText } from '../../utils/TextSource';
import styles from './contacts.module.css';

interface ContactsProps { }

const Contacts: FC<ContactsProps> = () => (
	<div className="w footer">
		<div className="fot_1">
			<p><img src="15.png" />{GetText.email()}</p>
			<div>
				<a href={GetText.linkedin()}>
					<img src="16.png" />
				</a>
				<a href={GetText.github()}>
					<img src="17.png" />
				</a>
				<a href={GetText.wechat()}>
					<img src="18.png" />
				</a>
			</div>
		</div>
		<div className="fot_2">
			<p>Contact me</p>
			<h3>{GetText.phone()}</h3>
			<a href={`mailto: ${GetText.email()}`}>Send emails</a>
		</div>
		<div className="fot_3">
			<p>Quick navigation</p>
			<div><a href="#">About</a><a href="#">Photo</a><a href="#">Game</a><a href="#">Contact</a></div>
		</div>
	</div>
);

export default Contacts;
