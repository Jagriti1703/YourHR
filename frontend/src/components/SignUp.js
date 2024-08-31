import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/users';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      alert(response.data.message); // Show success message
      onSignUp(); // Optional: handle any post-signup logic

      // Redirect to login page after successful sign-up
      navigate('/login');
    } catch (err) {
      console.error('Error signing up:', err);
      // You can still log the error for debugging, but without setting an error state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button type="submit">Sign Up</button>
      {/* Error messages removed */}
    </form>
  );
};

export default SignUp;
