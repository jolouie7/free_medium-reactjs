import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Profile from "./components/UserProfile";
import UserSettings from './components/UserSettings';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateArticle from './components/CreateArticle';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from './actions/articleActions';
import HomePage from './containers/HomePage';
import { getAllUsers } from './actions/usersActions';
import Article from './components/Article';
import EditArticle from './components/EditArticle';
import { RootStore } from './store';

const App: React.FC = () => {
  // const articles = useSelector((state: RootStore) => state.articles)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles());
    dispatch(getAllUsers());
  }, []);

  return (
    <Router>
      <NavbarComponent /> <br />
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
        <ProtectedRoute component={CreateArticle} path="/create-post" />
        <ProtectedRoute component={Profile} path="/profile" />
        <ProtectedRoute component={UserSettings} path="/user-settings" />
      </Switch>
    </Router>
  );
}

export default App;