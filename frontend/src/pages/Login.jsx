import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });
      login(response.data);
      navigate('/home');
    } catch (error) {
      console.log(error);
      console.error('Login failed:', error.response.data);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <div className="row justify-content-md-center mt-5 p-5">
        <div className="col-md-4 shadow p-3 mb-5 bg-white rounded p-5">
          <h2 className="text-center">Login</h2>
          {error && (
            <p className="text-danger container text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                type="text"
                className="form-control mt-1"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
