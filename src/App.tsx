import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopNavBar from './components/TopNavBar/TopNavBar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
function App() {
  return (
    <div className="App">
      <TopNavBar/>
      <Home/>
      <About/>
      <Contact/>
    </div>
  );
}

export default App;
