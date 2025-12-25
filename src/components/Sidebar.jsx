// src/components/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  // Hide sidebar links on login to prevent navigation bypass
  if (isLogin) return <div className={`sidebar ${isOpen ? 'open' : ''}`} />;

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Link to="/profile">Profile</Link>
      <Link to="/">Home</Link>
      
      {/* ADDED: Link to the Healing Facts page */}
      <Link to="/healing-facts">Healing Facts</Link>
      
      <Link to="/help">Help</Link>
      <Link to="/fav">Fav</Link>
    </div>
  );
};

export default Sidebar;