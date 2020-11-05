import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useSelector } from 'react-redux';
import { RootStore } from '../store';

const GlobalFeed: React.FC = () => {
  const articles: any = useSelector((state: RootStore) => state.articles);
  const [isLoading, setisLoading] = useState(false)
  console.log(articles)
  const allArticles = articles.articles
  console.log(allArticles);
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
                  <div>Username</div>
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
                <Col>Read more...</Col>
              </Row>
            </Container>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default GlobalFeed
