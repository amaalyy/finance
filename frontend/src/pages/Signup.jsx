import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import BackgroundImage from '/background.jpg';
import EmailIcon from '/email.svg';
import UserIcon from '/username.svg';
import PasswordIcon from '/password.svg';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

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

      // If signup is successful, set signupSuccess to true
      setSignupSuccess(true);

      // Reset the form fields and error message
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      // If signup fails, display an error message to the user
      console.error('Sign up failed:', error.response.data);
      setError('Sign up failed. Please try again.');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="p-7">
        <img
          className="w-full h-full absolute inset-0 -z-10"
          src={BackgroundImage}
          alt=""
        />
        <div className="bg-white w-[450px] mt-16 ml-auto mr-11 px-16 pt-7 rounded-lg pb-9 shadow-xl">
          <h2 className="text-[40px] text-blue text-center font-bold">
            Sign up
          </h2>
          {signupSuccess ? (
            <div className="antialiased text-lg mt-5 text-center">
              <p className="mb-5 antialiased">
                signup successful! Click below to login:
              </p>
              <Link
                className="bg-blue text-white w-28 p-1.5 rounded-full hover:bg-hover-btn block mx-auto"
                to="/"
              >
                Login
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="pb-3 mt-5">
                  <label className="antialiased">Email</label>
                  <div className="grid grid-cols-[auto_1fr] bg-gray-100 p-2.5 rounded-md mt-1.5">
                    <img
                      className="my-auto h-5 w-5 bg-gray-100"
                      src={EmailIcon}
                      alt=""
                    />
                    <input
                      placeholder="Type your email"
                      type="email"
                      className="bg-gray-100 w-full ml-1 focus:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group pb-3 mt-2">
                  <label className="antialiased">Username</label>
                  <div className="grid grid-cols-[auto_1fr] bg-gray-100 p-2.5 rounded-md mt-1.5">
                    <img
                      className="my-auto h-5 w-5 bg-gray-100"
                      src={UserIcon}
                      alt=""
                    />
                    <input
                      placeholder="Type your username"
                      type="text"
                      className="bg-gray-100 w-full ml-1 focus:outline-none"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group pb-3 mt-2">
                  <label className="antialiased">Password</label>
                  <div className="grid grid-cols-[auto_1fr] bg-gray-100 p-2.5 rounded-md mt-1.5">
                    <img
                      className="my-auto h-5 w-5 bg-gray-100"
                      src={PasswordIcon}
                      alt=""
                    />
                    <input
                      placeholder="Type your password"
                      type="password"
                      className="bg-gray-100 w-full ml-1 focus:outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group pb-3 mt-2">
                  <label className="antialiased">Confirm Password</label>
                  <div className="grid grid-cols-[auto_1fr] bg-gray-100 p-2.5 rounded-md mt-1.5">
                    <img
                      className="my-auto h-5 w-5 bg-gray-100"
                      src={PasswordIcon}
                      alt=""
                    />
                    <input
                      placeholder="Type your password again"
                      type="password"
                      className="bg-gray-100 w-full ml-1 focus:outline-none"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 bg-blue text-white w-full p-1.5 rounded-full hover:bg-hover-btn"
                >
                  Sign up
                </button>
              </form>
              <p className="text-center pt-5 antialiased">
                Already have an account?{' '}
                <Link className=" text-blue hover:text-hover-btn" to="/login">
                  Login here
                </Link>
              </p>
            </>
          )}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <button
            className="mt-4 w-full text-sm text-blue hover:text-hover-btn antialiased"
            onClick={goBack}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
