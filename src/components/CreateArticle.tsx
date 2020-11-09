import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { createArticle } from '../actions/articleActions';
import { useHistory } from 'react-router-dom';

const CreateArticle: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStore) => state.auth);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const currentUser = auth.user;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "subTitle") {
      setSubTitle(event.target.value);
    } else if (event.target.name === "content") {
      setContent(event.target.value);
    } else if (event.target.name === "tags") {
      setTags(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser) {
      dispatch(createArticle(title, subTitle, content, tags, currentUser.id));
      history.push("/");
    } else {
      console.log("Could not create the article")
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Article Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="What's this article about?"
            name="subTitle"
            value={subTitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Write your article (in markdown)"
            as="textarea"
            name="content"
            value={content}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter Tags E.g. #Food"
            name="tags"
            value={tags}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish Article
        </Button>
      </Form>
    </Container>
  );
}

export default CreateArticle
