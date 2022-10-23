import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopNavBar from './components/TopNavBar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

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
