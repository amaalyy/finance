import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import HomeIcon from '/home.svg';
import IncomeIcone from '/income.svg';
import ExpenseIcone from '/expenses.svg';
import SettingsIcon from '/Settings.svg';
import ReportIcon from '/report.svg';
import CategoryIcon from '/Category.svg';
import LogoutIcone from '/Logout.svg';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="grid bg-[#E4F3FB] px-3.5 shadow-sm row-span-2">
      <NavLink className="" to="/">
        Wealthwise
      </NavLink>
      <nav className="text-[#5c636c]">
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3'
              }
            >
              <img className="h-5 w-5 my-auto" src={HomeIcon} alt="" />
              <p className="text-[18px] antialiased my-auto ml-3">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/income"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 mt-2'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 mt-2'
              }
            >
              <img className="h-5 w-5 my-auto" src={IncomeIcone} alt="" />
              <p className="text-[18px] antialiased my-auto ml-3">Add Income</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 mt-2'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 mt-2'
              }
            >
              <img className="h-5 w-5 my-auto" src={ExpenseIcone} alt="" />
              <p className="text-[18px] antialiased my-auto ml-3">
                Add Expenses
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 mt-2'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 mt-2'
              }
            >
              <img className="h-5 w-5 my-auto" src={ReportIcon} alt="" />
              <p className="text-[18px] antialiased my-auto ml-3">Reports</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 mt-2'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 mt-2'
              }
            >
              <img className="h-5 w-5 my-auto" src={CategoryIcon} alt="" />
              <p className="text-[18px] antialiased my-auto ml-3">
                New Category
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 mt-2'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 mt-2'
              }
            >
              <img className="h-5 w-5 my-auto" src={SettingsIcon} alt="" />
              <p className="text-[18px] antialiased my-auto ml-3">Settings</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link className="grid grid-cols-[auto_1fr] mt-auto pb-10" to="/login">
        <img className="h-5 w-5 my-auto ml-9" src={LogoutIcone} alt="" />
        <button
          className="text-[16px] antialiased text-[#5c636c] mr-12"
          onClick={logout}
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
