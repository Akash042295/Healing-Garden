import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth/session related storage keys
    try {
      sessionStorage.removeItem('gardenStarted');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userAvatar');
    } catch (e) {}
    try {
      // optional: don't remove app-wide data like favorites unless desired
    } catch (e) {}

    // Redirect to login and replace history so back doesn't bypass
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <div className="subpage-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Signed out</h2>
        <p>Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Logout;
