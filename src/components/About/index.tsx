import React, { FC } from 'react';
import Post from '../Post';
import './About.css';

interface AboutProps {}

const About: FC<AboutProps> = () => (
  <div className="About" id="about">
    <h2>If you're looking for a good candinate, I'm the one</h2>
      <p>here's the exprience and things I do</p>
    <Post/>
    <Post/>
    <Post/>
  </div>
);

export default About;
