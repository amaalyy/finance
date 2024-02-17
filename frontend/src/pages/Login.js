// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      // If authentication is successful, you can redirect the user or perform other actions
      console.log('Login successful:', response.data);

      // Reset the form fields and error message
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      // If authentication fails, display an error message to the user
      console.error('Login failed:', error.response.data);
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
