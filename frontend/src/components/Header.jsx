import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  return (
    <header className="bg-[#FEE781]">
      <div className='text-2xl antialiased font-semibold p-7'>
        <p>{title}</p>
      </div>
    </header>
  );
};

export default Header;
