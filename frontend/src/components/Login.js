import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/users';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      alert(response.data.message);
      // Store user info and token in localStorage
      localStorage.setItem('user', JSON.stringify({ ...response.data, name: 'User Name' }));
      onLogin(); // Update user state in App.js
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.error || 'Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
