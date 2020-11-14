import React, { useState } from "react";
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
import { CommentType } from "../actions/commentActionTypes";
import { createComments, deleteComment } from "../actions/commentActions";
import { FaTrashAlt } from "react-icons/fa";

const Article: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const comments: any = useSelector((state: RootStore) => state.comments);
  const users: any = useSelector((state: RootStore) => state.users);
  const auth: any = useSelector((state: RootStore) => state.auth);
  const allUsers = users.users;

  const [content, setContent] = useState("");

  // get article info from localstorage to persist data after refresh
  const articleInfo: any = localStorage.getItem("articleInfo");
  const article = JSON.parse(articleInfo);

  // This function finds and displays the username of the person who wrote the article
  const displayUsernameArticleAuthor = (article: ArticleType) => {
    const articleUserWrote = allUsers.find(
      (user: any) => user._id === article.user
    );
    return (
      <Link style={{ color: "inherit" }} to={`/profile/${articleUserWrote.username}`}>
        {articleUserWrote.username}
      </Link>
    );
  };

  // This function finds and displays the username of the person who wrote the comment
  const displayUsernameCommentAuthor = (comment: CommentType) => {
    const commentUserWrote = allUsers.find(
      (user: any) => user._id === comment.user
    );
    return (
      <Link
        style={{ color: "inherit" }}
        to={`/profile/${commentUserWrote.username}`}
      >
        {commentUserWrote.username}
      </Link>
    );
  };

  const handleClick = () => {
    dispatch(deleteArticle(article._id));
    history.push("/");
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createComments(content, article._id, auth.user.id));
    setContent("");
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment(commentId));
    window.location.reload();
  };

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>{article.title}</h1>
          <Row>
            <Col className="col-auto">User Profile Pic</Col>
            <Col className="col-auto">
              {allUsers.length !== 0 && displayUsernameArticleAuthor(article)}
              <div className="text-muted">
                {moment(article.registerDate).format("dddd, MMMM Do YYYY")}
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
        <div dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }}></div>
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
        {auth.user && (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="Write a comment..."
                as="textarea"
                rows={3}
                name="content"
                value={content}
                onChange={handleChange}
              />
              <Container
                style={{ backgroundColor: "#f5f5f5" }}
                className="py-3 text-right"
              >
                <Button variant="primary" type="submit">
                  Post Comment
                </Button>
              </Container>
            </Form.Group>
          </Form>
        )}

        {/* If there are comments for this article get the comments that belong to this article */}
        {comments.comments.length !== 0 &&
          comments.comments
            .filter((comment: CommentType) => comment.article === article._id)
            .map((comment: CommentType, index: number) => (
              <div className="mb-3" key={index}>
                {/* Go through all the users and find the user who wrote this comment and display username */}
                <Container className="border">
                  <Row className="p-3">
                    <Col>{comment.content}</Col>
                  </Row>
                  <Row className="py-3 bg-secondary text-white">
                    <Col className="col-auto">
                      -{" "}
                      {/* {allUsers.length !== 0 &&
                          allUsers.find(
                            (user: any) => user._id === comment.user
                          ).username} */}
                      {allUsers.length !== 0 &&
                        displayUsernameCommentAuthor(comment)}
                    </Col>
                    <Col>
                      {moment(comment.registerDate).format(
                        "dddd, MMMM Do YYYY"
                      )}
                    </Col>
                    {auth.user && auth.user.id === comment.user && (
                      <Col className="ml-auto col-auto">
                        <FaTrashAlt
                          onClick={() => handleDeleteComment(comment._id)}
                        />
                      </Col>
                    )}
                  </Row>
                </Container>
              </div>
            ))}
        {/* <Container className="border">
          <Row className="p-3">
            <Col>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
              nisi ducimus similique beatae numquam soluta commodi in aliquid,
              laboriosam alias, dolore veritatis libero nesciunt laborum
              temporibus qui nam atque ipsam?
            </Col>
          </Row>
          <Row className="p-3 mb-2 bg-secondary text-white">
            <Col>-jojo Sunday, November 8th 2020</Col>
            <FaTrashAlt />
          </Row>
        </Container> */}
      </Container>
    </div>
  );
};

export default Article;
