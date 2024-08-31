import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import Form from './components/Form';
import Modal from './components/Modal';

const App = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    setShowModal(false); // Close modal on login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const isAuthenticated = !!user;

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={<Home openModal={openModal} isAuthenticated={isAuthenticated} />} 
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Form />} />
        
      </Routes>

      {/* Modal Component */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Login onLogin={handleLogin} />
      </Modal>
    </>
  );
};

export default App;
