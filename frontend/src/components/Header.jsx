import { Link, useNavigate} from 'react-router-dom';

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
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <Link className="navbar-brand" to="/">
          Wealthwise
        </Link>
        <div className=" navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
            <li>
            <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
