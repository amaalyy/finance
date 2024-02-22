import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        email,
        username,
        password
      });

      // If registration is successful, set registrationSuccess to true
      setRegistrationSuccess(true);

      // Reset the form fields and error message
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      // If registration fails, display an error message to the user
      console.error('Registration failed:', error.response.data);
      setError('Registration failed. Please try again.');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5">
      <Header />
      <div className="row justify-content-md-center mt-5 p-5">
        <h2>Signup</h2>
        {registrationSuccess ? (
          <div>
            <p>Registration successful! Click below to login:</p>
            <Link to="/">Login</Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
              <div>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4 w-100">
                Sign up
              </button>
            </form>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={goBack}>GO Back</button>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
