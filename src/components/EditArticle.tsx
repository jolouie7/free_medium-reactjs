import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { updateArticle } from "../actions/articleActions";
import { useHistory } from "react-router-dom";

const EditArticle: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStore) => state.auth);

  // get article info from localstorage to persist data after refresh
  const articleInfo: any = localStorage.getItem("articleInfo");
  const article = JSON.parse(articleInfo);

  const [title, setTitle] = useState(article.title);
  const [subTitle, setSubTitle] = useState(article.subTitle);
  const [content, setContent] = useState(article.content);
  const [tags, setTags] = useState(article.tags);
  const [likes, setLikes] = useState(article.likes);

  const currentUser = auth.user;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "subTitle") {
      setSubTitle(event.target.value);
    } else if (event.target.name === "content") {
      setContent(event.target.value);
    } else if (event.target.name === "tags") {
      setTags([...tags, event.target.value]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser) {
      dispatch(
        updateArticle(title, subTitle, content, tags, likes, article._id, article.slug)
      );
      history.push("/");
      window.location.reload();
    } else {
      console.log("Could not create the article");
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
            disabled
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publish Article
        </Button>
      </Form>
    </Container>
  );
}

export default EditArticle
