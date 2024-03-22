import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import UserAccountIcon from '/useraccount.svg';


const Header = ({ title }) => {
  const { user } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className="bg-[#E0DDDB]">
      <div className="text-2xl antialiased font-semibold p-7">
        <p>{title}</p>
        <div className="relative">
          <img className='h-14 w-14 ml-auto mr-6 -translate-y-10'
            src={UserAccountIcon}
            alt="User Profile"
            onClick={toggleVisibility}
          />
          {isVisible && (
            <div className="absolute bg-white p-2 rounded-md shadow-md ml-6 right-0 -translate-y-10">
              <p className='text-xl'>Username: {user.username}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};;
export default Header;
