import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CurrentUserProfile from "./components/UserProfile";
import UserSettings from './components/UserSettings';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateArticle from './components/CreateArticle';
import { useDispatch } from 'react-redux';
import { getArticles } from './actions/articleActions';
import HomePage from './containers/HomePage';
import { getAllUsers } from './actions/usersActions';
import Article from './components/Article';
import EditArticle from './components/EditArticle';
import { getComments } from './actions/commentActions';
import OtherUsersProfile from './components/OtherUsersProfile';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
    dispatch(getAllUsers());
    dispatch(getComments());
  }, []);

  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/articles/:id">
          <Article />
        </Route>
        <Route exact path="/editor/:id">
          <EditArticle />
        </Route>
        <Route exact path="/profile/:username">
          <OtherUsersProfile />
        </Route>
        <ProtectedRoute component={CreateArticle} path="/create-post" />
        <ProtectedRoute component={CurrentUserProfile} path="/profile" />
        <ProtectedRoute component={UserSettings} path="/user-settings" />
      </Switch>
    </Router>
  );
}

export default App;