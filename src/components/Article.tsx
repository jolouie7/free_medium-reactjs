import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Article: React.FC = () => {
  // save article info in localstorage to persist data after refresh
  const articleInfo: any = localStorage.getItem("articleInfo");
  const article = JSON.parse(articleInfo);
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>{article.title}</h1>
          <div>
            <div>User Profile Pic</div>
            <div>{article.user}</div>
            <div>{article.createdAt}</div>
          </div>
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
