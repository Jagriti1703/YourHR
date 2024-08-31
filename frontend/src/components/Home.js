import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const Home = ({ openModal, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      if (typeof openModal === 'function') {
        openModal(true); // Open login modal
      } else {
        console.error('openModal is not a function');
      }
    }
  };

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to YourHR</h1>
          <p>Your one-stop job search service to find the perfect job tailored to your skills and preferences.</p>
          <button onClick={handleButtonClick} className="cta-button">
            Discover Your Next Role – Share Your Resume with Us!
          </button>
        </div>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Personalized Job Matching</h3>
            <p>We analyze your qualifications and preferences to match you with the best job opportunities.</p>
          </div>
          <div className="feature-card">
            <h3>Easy Resume Upload</h3>
            <p>Submit your resume quickly and easily with our user-friendly upload system.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our team is available around the clock to assist you with any questions or concerns.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 YourHR. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
