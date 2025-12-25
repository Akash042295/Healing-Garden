// src/components/DoctorConsultant.jsx

import React, { useState } from 'react';

const DoctorConsultant = () => {
  const [activeNav, setActiveNav] = useState('doctor');

  const specializations = [
    { name: 'Herbal Medicine', icon: '🌿' },
    { name: 'Ayurvedic Doctor', icon: '💆' },
    { name: 'Homeopathy', icon: '⚗️' },
    { name: 'Naturopathy', icon: '🍃' },
    { name: 'Acupuncture', icon: '💉' }
  ];

  return (
    <div className="doctor-page">
      {/* Navigation Bar */}
      <div className="doctor-nav-bar">
        <button 
          className={`doctor-nav-btn ${activeNav === 'doctor' ? 'active' : ''}`}
          onClick={() => setActiveNav('doctor')}
        >
          Doctor
        </button>
        <button 
          className={`doctor-nav-btn ${activeNav === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveNav('contact')}
        >
          Contact
        </button>
        <button 
          className={`doctor-nav-btn ${activeNav === 'services' ? 'active' : ''}`}
          onClick={() => setActiveNav('services')}
        >
          Services
        </button>
        <button 
          className={`doctor-nav-btn ${activeNav === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveNav('blog')}
        >
          Blog
        </button>
      </div>

      {/* Main Content Section */}
      <div className="doctor-content-section">
        <div className="doctor-text-side">
          <h1 className="doctor-tagline">The Best Doctor Gives The Least Medicines</h1>
          <p className="doctor-description">
            Our expert consultants believe in holistic healing through natural remedies and preventive care. 
            We focus on treating the root cause, not just symptoms.
          </p>
          <button className="doctor-cta-btn">Book Consultation Now</button>
        </div>

        <div className="doctor-image-side">
          <div className="doctor-cartoon">
            <img src="assets/doctor-cartoon.png" alt="Doctor" className="doctor-img" />
          </div>
        </div>
      </div>

      {/* Specialization Buttons */}
      <div className="doctor-specializations">
        <h2>Our Specializations</h2>
        <div className="spec-buttons-container">
          {specializations.map((spec, idx) => (
            <button key={idx} className="spec-btn">
              <span className="spec-icon">{spec.icon}</span>
              <span className="spec-name">{spec.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="doctor-tab-content">
        {activeNav === 'doctor' && (
          <div className="tab-panel">
            <h2>About Our Doctors</h2>
            <p>Our team of experienced herbalists and natural medicine practitioners are dedicated to providing personalized care.</p>
          </div>
        )}
        {activeNav === 'contact' && (
          <div className="tab-panel">
            <h2>Contact Us</h2>
            <p>📞 Phone: +1-800-HEALING</p>
            <p>📧 Email: consult@virtualgarden.com</p>
            <p>📍 Address: 123 Wellness Street, Health City</p>
          </div>
        )}
        {activeNav === 'services' && (
          <div className="tab-panel">
            <h2>Our Services</h2>
            <ul>
              <li>One-on-one Consultations</li>
              <li>Herbal Treatment Plans</li>
              <li>Nutritional Guidance</li>
              <li>Wellness Programs</li>
              <li>Online Appointments</li>
            </ul>
          </div>
        )}
        {activeNav === 'blog' && (
          <div className="tab-panel">
            <h2>Health Blog</h2>
            <p>Stay updated with the latest articles on natural healing and wellness tips.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorConsultant;
