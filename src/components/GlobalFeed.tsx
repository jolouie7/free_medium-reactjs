import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { ArticleType } from '../actions/articleActionTypes';
import { Link } from 'react-router-dom';
import moment from "moment";
import { updateArticle, getArticles } from "../actions/articleActions";
import GlobalArticle from './GlobalArticle';

const GlobalFeed: React.FC = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector((state: RootStore) => state.auth);
  const articles: any = useSelector((state: RootStore) => state.articles);
  const users: any = useSelector((state: RootStore) => state.users);
  const [articleLikes, setArticleLikes] = useState(0);
  const [isLoading, setisLoading] = useState(false)
  const allUsers = users.users;
  const allArticles = articles.articles
  const reversedArticles = [...allArticles].reverse()

  return (
    <div>
      {allArticles.length === 0 && <div>Loading...</div>}
      {allArticles.length !== 0 &&
        reversedArticles.map((article: any, index: number) => (
          <GlobalArticle article={article} index={index} key={index} />
        ))}
    </div>
  );
}

export default GlobalFeed
