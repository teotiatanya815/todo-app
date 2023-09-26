import React, { useState } from 'react';
import './RegistrationForm.css';
import {useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegistration = (event) => {
    event.preventDefault();
  
    // Retrieve the current value of userid from localStorage
    let currentUserId = parseInt(localStorage.getItem('userid')) || 0;
  
    // Increment the userid for the new user
    currentUserId++;
  
    // Store the updated userid, username, and password in localStorage
    localStorage.setItem('userid', currentUserId.toString());
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    
    navigate('/login');
    console.log('User registered:', { userid: currentUserId, username, password });

  };
  

  return (
    <div className="registration-container">
      <h2>User Registration</h2>
      <form className="registration-form" onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
      <div className="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default RegistrationForm;
