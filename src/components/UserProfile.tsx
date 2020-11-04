import React, {useState} from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import { MdSettings } from "react-icons/md";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

import { RootStore } from '../store';

const Profile: React.FC = () => {
  const auth = useSelector((state: RootStore) => state.auth);
  const [key, setKey] = useState("home");

  const currentUser = auth.user;
  return (
    <div>
      <Jumbotron className="text-center">
        <h1>Icon Here</h1>
        {currentUser && <p>{currentUser.username}</p>}
        <Button variant="outline-secondary" href="/user-settings">
          Edit Profile Settings
          <MdSettings />
        </Button>
      </Jumbotron>
      <Container>
        <Tabs
        // id="controlled-tab-example"
        // activeKey={key}
        // onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Home">
            <h1>Home</h1>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <h1>Profile</h1>
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            <h1>Contact</h1>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default Profile
