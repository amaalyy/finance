import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Import from the pages folder
import Signup from './pages/Signup'; // Import the Sign up from the pages folder
import HomePage from './pages/HomePage';
import AddIncomePage from './pages/AddIncomepage';
import AddExpensesPage from './pages/AddExpensesPage';
import ReportPage from './pages/ReportPage';
import NewCategory from './pages/NewCategory';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/income" element={<AddIncomePage />} />
        <Route path="/expenses" element={<AddExpensesPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/category" element={<NewCategory />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
