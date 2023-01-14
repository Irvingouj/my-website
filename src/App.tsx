import React from 'react';
import About from './components/about/about';
import './styles.css'
import './public.css'
import GameWrapper from './components/gameWrapper/gameWrapper';
import PhotoWall from './components/photoWall/photoWall';
import LinksWrapper from './components/LinksWrapper/LinksWrapper';
import Contacts from './components/contacts/contacts';
import GameIntro from './components/gameIntro/gameIntro';

function App() {
  return (
    <div className="App">
      <About />
      <GameWrapper/>
      {/* <PhotoWall/> */}
      <LinksWrapper/>
      <GameIntro/>
      <Contacts/>
    </div>
  );
}

export default App;
