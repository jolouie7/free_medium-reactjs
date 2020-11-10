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

const GlobalFeed: React.FC = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector((state: RootStore) => state.auth);
  const articles: any = useSelector((state: RootStore) => state.articles);
  const users: any = useSelector((state: RootStore) => state.users);
  const [articleLikes, setArticleLikes] = useState(0);
  const [isLoading, setisLoading] = useState(false)
  const allUsers = users.users;
  const allArticles = articles.articles

  useEffect(() => {
    dispatch(getArticles());
  }, [articles.articles.likes])

  // This function finds and displays the username of the person who wrote the article
  const displayUsername = (article: ArticleType) => {
    const articleUserWrote = allUsers.find((user: any) => user._id === article.user);
    // console.log(articleUserWrote)
    return (
      <Link style={{ color: "inherit" }} to={`/profile/${articleUserWrote.username}`}>{articleUserWrote.username}</Link>
    )
  }

  const handleClick: any = (article: ArticleType) => {
    localStorage.setItem("articleInfo", JSON.stringify(article));
  }

  const handleLikeClick = (article: ArticleType) => {
    // If user is in the likes array and they click on the like button
    if (auth.user && article.likes.includes(auth.user.id)) {
      // remove the user from the likes array
      const removeUserFromLikesArray = article.likes.filter(like => like !== auth.user.id)
      dispatch(
        updateArticle(
          article.title,
          article.subTitle,
          article.content,
          article.tags,
          removeUserFromLikesArray,
          article._id,
          article.slug
        )
      );
      return <div>Likes:: {article.likes.length}</div>;
    } else if (auth.user && !article.likes.includes(auth.user.id)) {
      dispatch(
        updateArticle(
          article.title,
          article.subTitle,
          article.content,
          article.tags,
          [...article.likes, auth.user.id],
          article._id,
          article.slug
        )
      );
      return <div>Likes:: {article.likes.length}</div>;
    }
  };

  return (
    <div>
      {allArticles.length === 0 && <div>Loading...</div>}
      {allArticles.length !== 0 &&
        allArticles.map((article: any, index: number) => (
          <div key={index}>
            <Container>
              <Row className="mt-5 mb-3">
                <Col className="col-auto">Profile Pic</Col>
                <Col>
                  {allUsers.length !== 0 && displayUsername(article)}
                  <div>
                    {moment(article.createdAt).format("dddd, MMMM Do YYYY")}
                  </div>
                </Col>
                <Col className="col-auto ml-auto">
                  {
                    auth.user ? 
                  <Button variant="primary" onClick={() => handleLikeClick(article)}>
                    Likes: {article.likes.length}
                  </Button>
                  :
                  <Button variant="primary">
                    Likes: {article.likes.length}
                  </Button>
                  }
                </Col>
              </Row>
              <Row>
                <Col>{article.title}</Col>
              </Row>
              <Row>
                <Col>{article.subTitle}</Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Link
                    to={`/articles/${article.slug}`}
                    onClick={() => handleClick(article)}
                  >
                    Read more...
                  </Link>
                </Col>
              </Row>
            </Container>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default GlobalFeed
