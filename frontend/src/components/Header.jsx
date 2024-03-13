import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';



const Header = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);
  return (
    <header className=' inset-x-0 top-0 z-30 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-xl '>
      <div className="flex items-center justify-between ml-8">
        <a className="navbar-brand" to="/">
          Wealthwise
        </a>
        


          <div className="flex items-center justify-end gap-3 mr-6">
            <a className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href="signup">Sign in</a>
            <a className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href="/login">Login</a>

            <button className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex" onClick={logout}>Logout</button>

          </div>
        

      </div>
    </header>
  );
};

export default Header;
