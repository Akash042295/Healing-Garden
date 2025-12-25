// src/components/ChatbotIcon.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const ChatbotIcon = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    const isLoggedIn = sessionStorage.getItem('userEmail'); // Check if user has logged in
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // This tells the browser to change the page to /ask
    navigate('/ask'); 
  };

  return (
    <div className="chatbot-container" onClick={handleIconClick}>
      <div className="chatbot-bubble">
        {/* Your cute bot image */}
        <img src="assets/bot.png" alt="Doctor Bot" />
        <div className="notification-dot"></div>
      </div>
      <span className="chatbot-tooltip">Click to Chat</span>
    </div>
  );
};

export default ChatbotIcon;