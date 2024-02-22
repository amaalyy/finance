import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'; // Import from the pages folder
import Signup from './pages/Signup' // Import the RegisterPage from the pages folder
import HomePage from './pages/HomePage'

import { AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    
    <Router>
    <div className="App">
    
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element ={<HomePage />} />
      <Route path="/" element={<Login />} />
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
