import React, { FC } from 'react';
import './Home.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className="Home" id="home">
    <div id='image-fit'>
      <img src="logo192.png" alt="" />
    </div>
    <div id='description'>
      <h1>Hi,I'm Irving</h1>  
      <p>an a little bit long description about my self,
      an a little bit long description about my self,
      an a little bit long description about my self,an a little bit long description about my self,
      an a little bit long description about my self,
      </p>
    </div>
  </div>
);

export default Home;
