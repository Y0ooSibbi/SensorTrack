import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css'
// import { getInitials } from './utils'; // Import getInitials function
// import { url } from './config';

const Sidebar = ({ onItemClick }) => {
  
  return (
    <aside>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Pocket Notes</h2>
        </div>
        <ul className="sidebar-list">
            <li>
              {/* Render group data */}
              <div className="icon"></div>
              <span>hello</span>
            </li>
            <li>
              {/* Render group data */}
              <div className="icon"></div>
              <span>hello</span>
            </li>
            <li>
              {/* Render group data */}
              <div className="icon"></div>
              <span>hello</span>
            </li>
        </ul>
      </div>
      <div className="sticky-button">+</div>
    </aside>
  );
};

export default Sidebar;