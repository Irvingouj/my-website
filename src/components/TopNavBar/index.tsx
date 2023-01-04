import React from "react";
import "./TopNavBar.css";

function TopNavBar() {
  return (
    <div id="top-nav-bar">
      <div className="wrapper">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </div>
    </div>
  );
}

export default TopNavBar;
