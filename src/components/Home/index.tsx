import React, { FC } from 'react';
import './Home.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className="Home" id="home">
    <div id='image-fit'>
      <img src="selfie.jpg" alt="" />
    </div>
    <div id='description'>
      <h1>Hi,I'm Irving</h1>  
      <p>
        I have to say this is a pretty boring personal website, if you are a recruiter who see this page, I'd appologize for didn't have time to make it more impersive. 
        I 'm keeping adding new features to this, so maybe come back a few weeks later, this page will be a bit more different and interesting.
      </p>
    </div>
  </div>
);

export default Home;
