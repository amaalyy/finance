import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import BackgroundImage from '/background.jpg';
import UserIcon from '/username.svg';
import PasswordIcon from '/password.svg';

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
    <div className="container mt-10">
      <div className="p-7">
        <img
          className="w-full h-full absolute inset-0 -z-10"
          src={BackgroundImage}
          alt=""
        />
        <div className="bg-white w-[450px] mt-28 ml-auto mr-11 px-16 pt-9 rounded-lg pb-16 shadow-xl">
          <h2 className="text-[40px] text-blue text-center font-bold">Login</h2>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="pb-3 mt-6">
              <label htmlFor="username" className="antialiased">
                Username
              </label>
              <div className="grid grid-cols-[auto_1fr] bg-gray-100 p-2.5 rounded-md mt-1.5 antialiased">
                <img
                  className="my-auto h-5 w-5 bg-gray-100"
                  src={UserIcon}
                  alt=""
                />
                <input
                  placeholder="Type your username"
                  name="username"
                  type="text"
                  className="bg-gray-100 w-full ml-1 focus:outline-none"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group pb-3 mt-3">
              <label htmlFor="password" className="antialiased">
                Password
              </label>
              <div className="grid grid-cols-[auto_1fr] bg-gray-100 p-2.5 rounded-md mt-1.5 antialiased">
                <img
                  className="my-auto h-5 w-5 bg-gray-100"
                  src={PasswordIcon}
                  alt=""
                />
                <input
                  placeholder="Type your password"
                  name="password"
                  type="password"
                  className="bg-gray-100 w-full ml-1 focus:outline-none"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 bg-blue text-white w-full p-1.5 rounded-full hover:bg-hover-btn"
            >
              Login
            </button>
          </form>
          <p className="mt-20 mb-3 text-center antialiased">

            Don't have an account??{' '}
            <Link className=" text-blue hover:text-hover-btn" to="/signup">
              Signup now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
