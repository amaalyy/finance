import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-[#E0DDDB]">
      <div className="text-2xl antialiased font-semibold p-7">
        <p>{title}</p>

      </div>
    </header>
  );
};
export default Header;
