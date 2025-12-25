import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Random name generation disabled — users should set their display name in profile.


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return setError('Please enter your email.');
    if (!password) return setError('Please enter your password.');

    // NOTE: This is a simple client-side stub. Replace with real auth in production.
    setError('');
    
    // Store email only; do not auto-generate username
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('user', JSON.stringify({ email: email }));
    
    if (typeof onLogin === 'function') onLogin();
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button style={styles.button} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #eaf7e1 0%, #ffffff 100%)',
  },
  card: {
    background: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
    width: '360px',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 12px 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d6e6c2'
  },
  button: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: 'none',
    background: '#3b7608',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    color: '#b00020',
    fontSize: '0.9rem'
  }
};

export default LoginPage;
