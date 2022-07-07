import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TopNavBar from "./components/TopNavBar/TopNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Home from "./Home";
import BlogPage from "./components/BlogPage/BlogPage";
function App() {
  return (
    <Router>
      <div>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/BlogPage" element={<BlogPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
