import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { logout } from '../actions/authActions';
import backendHost from '../constants/api-config';

const UserSettings: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStore) => state.auth)
  const currentUser = auth.user;
  const [url, setUrl] = useState<string>(
    "https://free-medium-profile-pictures.s3-us-west-1.amazonaws.com/defaultUserImage74a49f63-d.png"
  );
  const [userSettings, setUserSettings] = useState({
    id: currentUser?.id,
    name: currentUser?.name,
    email: currentUser?.email,
    username: currentUser?.username,
    password: "",
    file: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSettings((prevState) => ({
      ...prevState,
      [event.target.name]: [event.target.value]
    }))
  }

  const handleFileUpload = async (file: any) => {
    const imageData = new FormData();
    imageData.append("image", file);

    const url = `${backendHost}/api/upload/${userSettings.id}`;

    const config = {
      method: "POST",
      body: imageData,
    };

    try {
      const req = await fetch(url, config);
      if (req.ok) {
        const res = await req.json();
        console.log(res);
        if (res.success) {
          setUrl(res.user.image);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <Form.File
            className="position-relative"
            name="profilePicture"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e: any) => {
              handleFileUpload(e.target.files ? e.target.files[0] : url);
            }}
            label="Change Profile Picture"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userSettings.username}
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
            value={userSettings.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userSettings.password}
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
