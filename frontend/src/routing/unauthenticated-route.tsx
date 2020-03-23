import React from "react";
import { Redirect, Route } from "react-router-dom";

interface UnauthenticatedRouteProps {
  component: any;
  isAuthenticated: boolean;
  redirectPath: string;
  path: string;
  t?: any;
}

const UnauthenticatedRoute = (
  unauthenticatedRouteProps: UnauthenticatedRouteProps
) => {
  const {
    component: Component,
    isAuthenticated,
    redirectPath,
    ...rest
  } = unauthenticatedRouteProps;
  return (
    <Route
      {...rest}
      render={props => {
        const currentPath = props.location.pathname;
        return isAuthenticated ? (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { referrer: currentPath },
            }}
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default UnauthenticatedRoute;
