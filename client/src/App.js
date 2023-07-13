import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Library from './components/Library';
import UserDashboard from './components/UserDashboard';
import BookDiscussion from './components/BookDiscussion';
import CommentingSystem from './components/CommentingSystem';
import Auth from './Auth';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Handle successful login by update loggedIn state
        setLoggedIn(true);
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        // Handle successful logout, e.g., update loggedIn state
        setLoggedIn(false);
      } else {
        // Handle logout error
        console.error('Logout failed');
      }
    } catch (error) {
      // Handle logout error
      console.error(error);
    }
  };

  return (
    <Router>
      <Container>
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
      </Container>
    </Router>
  );
};

export default App;