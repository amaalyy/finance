import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import HomeIcon from '/home.svg';
import IncomeIcone from '/income.svg';
import ExpenseIcone from '/expenses.svg';
import SettingsIcon from '/Settings.svg';
import ReportIcon from '/report.svg';
import CategoryIcon from '/Category.svg';
import LogoutIcone from '/Logout.svg';
import LogoIcone from '/Logo.svg';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="grid grid-rows-[auto_auto_auto] bg-white p-3.5 shadow-sm row-span-2 h-screen sticky top-0">
      <NavLink
        className="text-center mx-3 text-[28px] antialiased m-6 w-22 h-12 "
        to="/home"
      >
        Wealthwise
      </NavLink>
      <nav className="text-[#5c636c]">
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 group'
                  : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 group'
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
          <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'grid grid-cols-[auto_1fr] rounded-lg bg-[#54ADFE] text-white p-3 mt-2'
                : 'grid grid-cols-[auto_1fr] rounded-lg hover:bg-[#54ADFE] hover:text-white p-3 mt-2'
            }
          >
            <img className="h-5 w-5 my-auto" src={LogoutIcone} alt="" />
            <button
              className="text-[16px] antialiased text-[#5c636c] mr-12"
              onClick={logout}
            >
              Logout
            </button>
          </NavLink>

          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
