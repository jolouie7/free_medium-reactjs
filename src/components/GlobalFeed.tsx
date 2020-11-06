import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useSelector } from 'react-redux';
import { RootStore } from '../store';
import { ArticleType } from '../actions/articleActionTypes';
import { Link } from 'react-router-dom';

const GlobalFeed: React.FC = () => {
  const articles: any = useSelector((state: RootStore) => state.articles);
  const users: any = useSelector((state: RootStore) => state.users);
  const [isLoading, setisLoading] = useState(false)
  const allUsers = users.users;
  console.log(allUsers);
  const allArticles = articles.articles
  console.log(allArticles)

  // This function finds and displays the username of the person who wrote the article
  const displayUsername = (article: ArticleType) => {
    const articleUserWrote = allUsers.find((user: any) => user._id === article.user);
    console.log(articleUserWrote)
    return (
      <div>{articleUserWrote.username}</div>
    )
  }
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
                  <div>{allUsers.length !== 0 && displayUsername(article)}</div>
                  <div>{article.createdAt}</div>
                </Col>
                <Col className="col-auto ml-auto">
                  Likes: {article.likes.length}
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
                  <Link to="/">Read more...</Link>
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
