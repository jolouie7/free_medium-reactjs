import React, { useCallback, useEffect, useState } from 'react';
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
import { ArticleType } from './actions/articleActionTypes';
import Axios from 'axios';
import backendHost from './constants/api-config';
import { getComments } from './actions/commentActions';

const App: React.FC = () => {
  // const articles: any = useSelector((state: RootStore) => state.articles)
  // const allArticles = articles.articles;
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();

  // const fetchArticles = useCallback(() => {
  //   dispatch(getArticles());
  // }, [dispatch]);

  // const fetchArticles = async () => {
  //   const res = await Axios.get(`${backendHost}/api/articles`)
  //   setArticles(res.data)
  // }

  useEffect(() => {
    dispatch(getArticles());
    // fetchArticles();
    dispatch(getAllUsers());
    dispatch(getComments());
  }, []);

  // console.log(allArticles);

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
        <ProtectedRoute component={CreateArticle} path="/create-post" />
        <ProtectedRoute component={Profile} path="/profile" />
        <ProtectedRoute component={UserSettings} path="/user-settings" />
      </Switch>
    </Router>
  );
}

export default App;