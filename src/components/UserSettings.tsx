import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UserSettings = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = () => {

  }
  const handleSubmit = () => {

  }

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h3>Your Settings</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>URL of profile picture</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Name"
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
            value={username}
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
      <Button variant="outline-danger">Click here to logout</Button>
    </Container>
  );
}

export default UserSettings
