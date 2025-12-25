import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const hideMission = location.pathname === '/ask';

  return (
    <footer>
      {/* SECTION 1: Full-width white mission area (hidden on Chatbot page) */}
      {!hideMission && (
        <div className="full-width-mission">
          <h3>More About Our Mission</h3>
          <p>
            We aim to preserve herbal knowledge and educate the next generation 
            about the power of nature's remedies through immersive and interactive 
            digital experiences.
          </p>
        </div>
      )}

      {/* SECTION 2: Light cream tagline area */}
      <div className="cream-tagline-bar">
        <p>Promoting traditional wisdom through modern technology.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.7 }}>
          © 2025 Virtual Herbal Garden Project
        </p>
      </div>
    </footer>
  );
};

export default Footer;