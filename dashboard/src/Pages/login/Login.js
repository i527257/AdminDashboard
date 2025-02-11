import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [displayname, setDisplayname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { updateToken } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayname || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const authResponse = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        displayname,
        password
      });

      if (authResponse.data && authResponse.data.token) {
        const token = authResponse.data.token;
        localStorage.setItem('token', token);
        updateToken(token);
        setErrorMessage('');
        navigate('/search');
      } else {
        setErrorMessage('Incorrect displayname or password.');
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
      setErrorMessage('Incorrect displayname or password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <div className="message error">{errorMessage}</div>}
        
        <input
          type="text"
          placeholder="Displayname"
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;