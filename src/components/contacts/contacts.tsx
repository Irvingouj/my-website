import React, { FC } from 'react';
import styles from './contacts.module.css';

interface ContactsProps {}

const Contacts: FC<ContactsProps> = () => (
  <div className="w footer">
	<div className="fot_1">
		<p><img src="15.png" />office@fhahfcafh.com</p>
		<div><a href="#"><img src="16.png" /></a><a href="#"><img src="17.png" /></a><a href="#"><img src="18.png" /></a></div>
	</div>
	<div className="fot_2">
		<p>Contact me</p>
		<h3>+132 459 05 6540</h3>
		<a href="#">Send emails</a>
	</div>
	<div className="fot_3">
		<p>Quick navigation</p>
		<div><a href="#">About</a><a href="#">Photo</a><a href="#">Game</a><a href="#">Contact</a></div>
	</div>
</div>
);

export default Contacts;
