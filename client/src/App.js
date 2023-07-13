import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import './app.css';

import Library from './components/Library';
import UserDashboard from './components/UserDashboard';
import BookDiscussion from './components/BookDiscussion';
import CommentingSystem from './components/CommentingSystem';
import Auth from './Auth';

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
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/library" /> : <Auth onLogin={handleLogin} />}
          </Route>
          {loggedIn && <Route path="/library" component={Library} />}
          {loggedIn && <Route path="/dashboard" component={UserDashboard} />}
          {loggedIn && <Route path="/discussion/:bookId" component={BookDiscussion} />}
        </Switch>
        {loggedIn && <CommentingSystem />}
      </div>
    </Router>
  );
};

export default App;