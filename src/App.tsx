import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Profile from './components/Profile';
import UserSettings from './components/UserSettings';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateArticle from './components/CreateArticle';

function App() {
  return (
    <Router>
      <NavbarComponent /> <br />
      <Switch>
        <Route exact path="/">
          <div>Hello World</div>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <ProtectedRoute component={CreateArticle} path="/create-post" />
        <ProtectedRoute component={Profile} path="/profile" />
        <ProtectedRoute component={UserSettings} path="/user-settings" />
      </Switch>
    </Router>
  );
}

export default App;