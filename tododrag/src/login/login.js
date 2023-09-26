import React, { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import {Link,useNavigate } from "react-router-dom";
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Store user data in local storage

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    // if(){
    //   alert("user id and password does not match");
    // }
   if(storedUsername === username && storedPassword === password) {
    console.log('User LogedIn:', { storedUsername, storedPassword });
    navigate('/dashboard');
   }else{
    alert("user name and password does not match");
   }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
