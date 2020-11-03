import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  component: any;
  path: string;
  rest?: any;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;

// Alternative version of above without any
// https://stackoverflow.com/questions/49274143/react-typescript-hoc-passing-component-as-the-prop