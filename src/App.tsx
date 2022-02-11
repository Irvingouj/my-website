import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TopNavBar from "./components/TopNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Blog from "./components/Blog";
import Home from "./Home";
function App() {
  return (
    <Router>
      <div>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/Blog" element={<Blog/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
