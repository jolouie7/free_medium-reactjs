import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { ArticleType } from "../actions/articleActionTypes";
import moment from "moment";
import { deleteArticle, updateArticle } from "../actions/articleActions";
import { Link, Redirect, useHistory } from "react-router-dom";
import authReducer from "../reducers/authReducer";

const Article: React.FC = () => {
  const history  = useHistory();
  const dispatch = useDispatch();
  const users: any = useSelector((state: RootStore) => state.users);
  const auth: any = useSelector((state: RootStore) => state.auth);
  const allUsers = users.users;

  // get article info from localstorage to persist data after refresh
  const articleInfo: any = localStorage.getItem("articleInfo");
  const article = JSON.parse(articleInfo);

  // This function finds and displays the username of the person who wrote the article
  const displayUsername = (article: ArticleType) => {
    const articleUserWrote = allUsers.find(
      (user: any) => user._id === article.user
    );
    console.log(articleUserWrote);
    return <div>{articleUserWrote.username}</div>;
  };

  const handleClick = () => {
    dispatch(deleteArticle(article._id))
    history.push("/")
    window.location.reload();
  }

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>{article.title}</h1>
          <Row>
            <Col className="col-auto">User Profile Pic</Col>
            <Col className="col-auto">
              {allUsers.length !== 0 && displayUsername(article)}
              <div>
                {moment(article.createdAt).format("dddd, MMMM Do YYYY")}
              </div>
            </Col>
            {auth.user && auth.user.id === article.user && (
              <>
                <Col className="col-auto">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/editor/${article.slug}`}
                  >
                    <Button variant="outline-secondary">Edit Article</Button>
                  </Link>
                </Col>
                <Col>
                  <Button variant="outline-danger" onClick={handleClick}>
                    Delete Article
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <p>{article.content}</p>
        <div>
          Tags:
          {article.tags &&
            article.tags.length !== 0 &&
            article.tags.map((tag: string, index: number) => (
              <div key={index}>{tag}</div>
            ))}
        </div>
        <hr />
      </Container>
      <Container>
        <Form>
          <Form.Group>
            <Form.Control
              placeholder="Write a comment..."
              as="textarea"
              rows={3}
            />
            <Container
              style={{ backgroundColor: "#f5f5f5" }}
              className="py-3 text-right"
            >
              <Button variant="primary">Post Comment</Button>
            </Container>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Article;