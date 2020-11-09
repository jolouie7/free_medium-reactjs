import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { logout } from '../actions/authActions';

const UserSettings: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStore) => state.auth)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = auth.user;

  useEffect(() => {
    if (currentUser) {
      // setProfilePicture()
      setUsername(currentUser.username);
      // setBio(currentUser.bio);
      setEmail(currentUser.email);
    }
  }, [])


  const handleChange = () => {

  }
  const handleSubmit = () => {

  }

  const handleLogout = () => {
    dispatch(logout());
    history.push("/")
  }

  return (
    <Container className="mt-4">
      <div style={{ textAlign: "center" }}>
        <h3>Your Settings</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>URL of profile picture</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value="URL of profile picture"
            placeholder="URL of profile picture"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            name="bio"
            value="Short bio about you"
            placeholder="Short bio about you"
            onChange={handleChange}
            as="textarea"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="New Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Settings
        </Button>
      </Form>
      <hr />
      <Button variant="outline-danger" onClick={handleLogout}>
        Click here to logout
      </Button>
    </Container>
  );
}

export default UserSettings
