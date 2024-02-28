import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-[#FEE781]'>
      <nav className="">
        <div className="">
          <ul className="">
            <li className="">
              <Link className="" to="/home">
                Home
              </Link>
            </li>
            <li className="">
              <Link className="" to="/login">
                Login
              </Link>
            </li>
            <li className="">
              <Link className="" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
