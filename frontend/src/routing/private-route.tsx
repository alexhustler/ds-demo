import React from "react";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteProps {
  component: any;
  authorized: boolean;
  isAuthenticated: boolean;
  redirectPath: string;
  path: string;
  t?: any;
}

const PrivateRoute = (privateRouteProps: PrivateRouteProps) => {
  const {
    component: Component,
    authorized,
    isAuthenticated,
    redirectPath,
    ...rest
  } = privateRouteProps;
  return (
    <Route
      {...rest}
      render={props => {
        const currentPath = props.location.pathname;
        return authorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isAuthenticated ? "/" : redirectPath,
              state: { referrer: currentPath },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
