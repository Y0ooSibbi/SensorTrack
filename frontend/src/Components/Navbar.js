import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);
  
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Sensor Tracking
      </Link>
      <ul style={{marginRight:0}}>
        <CustomLink to="/add-graph">Add Graph</CustomLink>
        <CustomLink to="/graph-list-page">List Of Graphs</CustomLink>
        <CustomLink to="/login">Logout</CustomLink>
        {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {username}  </button> */}
        {/* <CustomLink to="/login">Logout</CustomLink> */}
      </ul>
      <label className="mt-3" style={{color:"white",marginTop:18}}>{username}</label>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}