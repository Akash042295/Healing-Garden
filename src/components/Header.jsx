// src/components/Header.jsx

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PlantScanner from './PlantScanner';

const Header = ({ onMenuClick }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const a = sessionStorage.getItem('userAvatar');
    if (a) setAvatarUrl(a);
  }, []);

  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isWelcome = location.pathname === '/' && sessionStorage.getItem('gardenStarted') !== 'true';

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handlePlantDetected = (plantData) => {
    sessionStorage.setItem('detectedPlant', JSON.stringify(plantData));
    setIsScannerOpen(false);
    console.log('Plant detected:', plantData);
  };

  return (
    <header>
      {!isLogin && !isWelcome && (
        <div className="menu-btn" onClick={onMenuClick}>
          ☰
        </div>
      )}
      <h1>Healing Garden</h1>
      {!isLogin && !isWelcome && (
        <nav className="nav-right">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/help" className="nav-link">Help</Link>
          <Link to="/fav" className="nav-link">Fav</Link>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
            <button
              type="button"
              className="scanner-btn"
              onClick={() => setIsScannerOpen(true)}
              title="Scan a plant"
            >
              📱
            </button>
          </form>
          <button
            className="profile-btn"
            onClick={() => {
              const isLoggedIn = sessionStorage.getItem('userEmail');
              if (!isLoggedIn) {
                window.location.href = '/login';
              } else {
                window.location.href = '/profile';
              }
            }}
            style={{ marginLeft: '8px', background: 'none', border: 'none', padding: 0 }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="profile" className="profile-avatar" />
            ) : (
              <div className="profile-avatar-fallback">👤</div>
            )}
          </button>
        </nav>
      )}

      {isScannerOpen && (
        <PlantScanner
          onClose={() => setIsScannerOpen(false)}
          onDetected={handlePlantDetected}
        />
      )}
    </header>
  );
};

export default Header;