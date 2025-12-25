import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', avatar: '' });
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [plantsExplored, setPlantsExplored] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const rawUser = sessionStorage.getItem('user') || sessionStorage.getItem('username');
    const rawEmail = sessionStorage.getItem('userEmail') || '';
    try {
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed && typeof parsed === 'object') setUser(prev => ({ ...prev, ...parsed, email: rawEmail || parsed.email }));
        else setUser(prev => ({ ...prev, name: String(parsed), email: rawEmail }));
      }
    } catch (e) {
      if (rawUser) setUser(prev => ({ ...prev, name: String(rawUser), email: rawEmail }));
    }

    const avatar = sessionStorage.getItem('userAvatar') || '';
    if (avatar) setUser(prev => ({ ...prev, avatar }));

    try {
      const favRaw = localStorage.getItem('favorites');
      if (favRaw) {
        const fav = JSON.parse(favRaw);
        if (Array.isArray(fav)) setFavoritesCount(fav.length);
      }
    } catch (e) {}

    try {
      const exploredRaw = localStorage.getItem('exploredPlants') || sessionStorage.getItem('exploredPlants');
      if (exploredRaw) {
        const parsed = JSON.parse(exploredRaw);
        if (Array.isArray(parsed)) setPlantsExplored(parsed.length);
        else setPlantsExplored(Number(parsed) || 0);
      }
    } catch (e) {
      const n = Number(localStorage.getItem('exploredPlants')) || Number(sessionStorage.getItem('exploredPlants')) || 0;
      setPlantsExplored(n);
    }
  }, []);

  const handleLogout = () => {
    // Navigate to the centralized logout page which clears session and redirects
    navigate('/logout');
  };

  const handleEditName = () => {
    setEditedName(user.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      const updatedUser = { ...user, name: editedName };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      sessionStorage.setItem('username', editedName);
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName('');
  };

  const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'G')}&background=5caf4c&color=fff&size=256`;

  return (
    <div className="subpage-container profile-page">
      <div className="profile-hero">
        <div className="profile-hero-inner">
          <img src={avatarUrl} alt="avatar" className="profile-avatar-large" />
          <div className="profile-header-text">
            {isEditingName ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                />
                <button onClick={handleSaveName} style={{ padding: '6px 12px', background: '#3b7608', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                <button onClick={handleCancelEdit} style={{ padding: '6px 12px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0 }}>{user.name || 'Guest User'}</h1>
                <button onClick={handleEditName} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✏️</button>
              </div>
            )}
            {user.email && <p className="muted">{user.email}</p>}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{favoritesCount}</div>
            <div className="stat-label">Favorites</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{plantsExplored}</div>
            <div className="stat-label">Plants Explored</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{hasProfileCompleted(user) ? '✓' : '✕'}</div>
            <div className="stat-label">Profile Complete</div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn primary" onClick={() => navigate('/')}>Go Home</button>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

function hasProfileCompleted(user) {
  return Boolean(user.name && user.email);
}

export default UserProfile;
