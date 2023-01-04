import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Postpage from '../../pages/Postpage';


interface MarkdownTopNavBarProps {}

const MarkdownTopNavBar: FC<MarkdownTopNavBarProps> = () => {
  return (
    <div id="top-nav-bar">
      <div className="wrapper">
        <li>
          <Link to="/Postpage"/>
        </li>
        <li>
          <Link to="/Postpage/editor"/>
        </li>
      </div>
    </div>
  );
};

export default MarkdownTopNavBar;
