import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const CreateArticle: React.FC = () => {
  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Control type="text" placeholder="Article Title" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="What's this article about?" />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Write your article (in markdown)"
            as="textarea"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Enter Tags" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish Article
        </Button>
      </Form>
    </Container>
  );
}

export default CreateArticle
