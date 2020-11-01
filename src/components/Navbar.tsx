import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { FaCog, FaRegEdit } from "react-icons/fa";

import { logout } from "../actions/authActions";
import { RootStore } from "../store";

const NavbarComp: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStore) => state.auth)
  const currentUser = auth.user


  let userNavbar
  if (currentUser) {
    userNavbar = (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Freemium</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/create-post">New Post <FaRegEdit /></Nav.Link>
              <Nav.Link href="/settings">Settings <FaCog /></Nav.Link>
              <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    userNavbar = (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Freemium</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <div>
      {userNavbar}
    </div>
  );
};

export default NavbarComp;
