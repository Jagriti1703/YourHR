import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Ensure this file exists

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_UPLOAD_URL || 'http://localhost:5000/api/upload';

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleResumeChange = (e) => setResume(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('email', email);
    formData.append('phone', phone);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert(response.data.message);
        navigate('/'); // Redirect to home page
      } else {
        setError(response.data.error || 'Error during submission. Please try again.');
      }
    } catch (err) {
      console.error('Error during submission:', err);
      setError(err.response?.data?.error || 'Error during submission. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1>Submit Your Resume</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your E-mail"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone No.</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume" className="form-label">Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleResumeChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Form;
