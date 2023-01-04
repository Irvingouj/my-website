import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Postpage from '../../pages/Postpage';
import './MarkdownTopNavBar.css';

interface MarkdownTopNavBarProps {}

const MarkdownTopNavBar: FC<MarkdownTopNavBarProps> = () => {
  return (
    <div id="MarkdownTopNavBar">
      <div className="wrapper">
        <li className="option">
          <Link to="/Postpage">
            Blogs
          </Link>
        </li>
        <li className="option">
          <Link to="/Postpage/editor">
            Editor
          </Link>
        </li>
      </div>
    </div>
  );
};

export default MarkdownTopNavBar;
