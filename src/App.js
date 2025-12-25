import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css'; 
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import HelpPage from './components/HelpPage';
import FactsPage from './components/FactsPage';
import FavPage from './components/FavPage';
import WelcomePage from './components/WelcomePage';
import ChatbotIcon from './components/ChatbotIcon';
import ChatbotPage from './components/ChatbotPage'; 
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import Logout from './components/Logout';
import DoctorConsultant from './components/DoctorConsultant';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); //
  const navigate = useNavigate();

  const [hasStarted, setHasStarted] = useState(
    sessionStorage.getItem('gardenStarted') === 'true'
  );

  const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);
  const closeSidebar = () => setIsSidebarOpen(false);

  const startGarden = () => {
    sessionStorage.setItem('gardenStarted', 'true');
    setHasStarted(true);
  };

  return (
    <>
      <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>
      <Sidebar isOpen={isSidebarOpen} />
      <Header onMenuClick={toggleSidebar} /> 

      {/* Logic: Only show the floating icon if the path is NOT '/ask' or '/login' */}
      {hasStarted && location.pathname !== '/ask' && location.pathname !== '/login' && <ChatbotIcon />}

      <div> 
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={startGarden} />}
          />
          <Route 
            path="/" 
            element={
              !hasStarted ? (
                <WelcomePage onStart={startGarden} />
              ) : (
                <MainContent isLoggedIn={false} onRequireLogin={() => navigate('/login')} />
              )
            } 
          />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/ask" element={<ChatbotPage />} /> 
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/healing-facts" element={<FactsPage />} />
          <Route path="/fav" element={<FavPage />} />
          <Route path="/doctor-consultant" element={<DoctorConsultant />} />
        </Routes>
      </div>
      
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;