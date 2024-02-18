import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);

    return(
        <div>
        <h2>Welcome to the Home Page</h2>
        {user ? (
          <div>
            <p>Hello, {user.username}!</p>
            
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    );
  };
  export default HomePage;    