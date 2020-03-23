import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history, StoreState } from "./redux/configure-store";
import AdminPage from "./admin/admin-page";
import AppRoutes from "./routing/app-routes";
import LoginPage from "./authentication/login-page";
import NoMatch from "./routing/no-match";
import theme from "./theme/theme";
import { routePaths } from "./routing/route-paths";
import { initializeHttpService } from "./http-service";
import PrivateRoute from "./routing/private-route";
import UnauthenticatedRoute from "./routing/unauthenticated-route";
import { validateSessionCookie } from "./authentication/authentication-actions";

import "./App.css";

interface AppProps {
  validateSessionCookie: Function;
  validatingSessionCookie: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  initializeHttpService: Function;
}

const renderApp = (isAuthenticated: boolean, isAdmin: boolean) => {
  return (
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <UnauthenticatedRoute
            path={routePaths.auth.login}
            component={LoginPage}
            redirectPath={routePaths.dashboard.root}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path={routePaths.admin.root}
            component={AdminPage}
            redirectPath={routePaths.auth.login}
            isAuthenticated={isAuthenticated}
            authorized={isAuthenticated}
          />
          <PrivateRoute
            path={routePaths.root}
            component={AppRoutes}
            redirectPath={routePaths.auth.login}
            isAuthenticated={isAuthenticated}
            authorized={isAuthenticated}
          />
          <Route component={NoMatch} />
        </Switch>
      </MuiThemeProvider>
    </ConnectedRouter>
  );
};

class App extends React.Component<AppProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMounting: true,
    };
  }

  componentWillMount() {
    this.props.validateSessionCookie();
    this.props.initializeHttpService();
  }

  componentDidMount() {
    this.setState({ isMounting: false });
  }

  render() {
    const { isAuthenticated, isAdmin } = this.props;

    return (
      <div>
        {(this.state as any).isMounting || this.props.validatingSessionCookie
          ? "Loading..."
          : renderApp(isAuthenticated, isAdmin)}
      </div>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => {
  const authenticationState = storeState.authentication;
  const { user, isAuthenticated } = authenticationState;
  return {
    isAuthenticated,
    isAdmin: user && user.isAdmin,
    validatingSessionCookie: storeState.authentication.validatingSessionCookie,
  };
};

export default connect(mapStateToProps, {
  initializeHttpService,
  validateSessionCookie,
})(App as any);
