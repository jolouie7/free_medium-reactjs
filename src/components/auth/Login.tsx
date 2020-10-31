import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../actions/authActions";

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(username, password));
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
