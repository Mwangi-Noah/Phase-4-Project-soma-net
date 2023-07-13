import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Library from './components/Library';
import UserDashboard from './components/UserDashboard';

import CommentingSystem from './components/CommentingSystem';
import Auth from './components/Auth';
import Register from './components/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Handle successful login by updating loggedIn state
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Handle successful logout by updating loggedIn state
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {loggedIn && (
              <>
                <li>
                  <Link to="/library">Library</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
            <li>
              {loggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/library" /> : <Auth onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          {loggedIn && <Route path="/library" element={<Library />} />}
          {loggedIn && <Route path="/dashboard" element={<UserDashboard />} />}
          
        </Routes>
        {loggedIn && <CommentingSystem />}
      </div>
    </Router>
  );
};

export default App;