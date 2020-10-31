import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../actions/authActions";

const NavbarComp: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/">Home</Link> <br />
      <Link to="/login">Login</Link> <br />
      <Link to="/signup">Sign Up</Link> <br />
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>{" "}
      <br />
    </div>
  );
};

export default NavbarComp;
