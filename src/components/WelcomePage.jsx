import React from 'react';

const WelcomePage = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to the Herbal Garden</h1>
        <p style={styles.subtitle}>Discover the healing power of nature through ancient wisdom.</p>
        <button style={styles.button} onClick={onStart}>
          ENTER THE GARDEN
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    backgroundImage: 'url("https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darkens the background to make text pop
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    color: 'white',
    maxWidth: '800px'
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    fontStyle: 'italic'
  },
  button: {
    padding: '15px 40px',
    fontSize: '1.2rem',
    backgroundColor: '#3b7608',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  }
};

export default WelcomePage;