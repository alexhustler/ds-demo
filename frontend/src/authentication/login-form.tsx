import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";
import isEmail from "validator/lib/isEmail";

import { Loading } from "../common/components/loading";
import { pathToLogoComplete } from "../common/assets";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
        3
      )}px`,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
  });

class LoginForm extends React.Component<any> {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  };

  onChange = (e: any) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = {
      email: "",
    };
    this.setState({ errors });

    if (!isEmail(data.email)) errors.email = "Invalid email";
    this.setState({ errors });

    if (errors.email.length === 0) {
      this.props.onSubmit(data.email, data.password);
    }
  };

  render() {
    const { classes, isLoginFailed, isSubmittingLoginForm, t } = this.props;
    const { data, errors } = this.state;

    return (
      <main className={classes.main}>
        <Paper elevation={2} className={classes.paper}>
          <Typography>
            <img
              src={pathToLogoComplete}
              alt="Demo"
              style={{
                verticalAlign: "middle",
                minWidth: "75px",
                maxWidth: "190px",
              }}
              width="100%"
              height="100%"
            />
          </Typography>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth error={!!errors.email}>
              <InputLabel htmlFor="email" required>
                Email Address
              </InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={this.onChange}
              />
              {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={this.onChange}
              />
            </FormControl>
            <FormHelperText
              error={true}
              className={isLoginFailed ? "" : "hidden"}
            >
              Incorrect email address or password (or account put on pause.)
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSubmittingLoginForm ? <Loading /> : "Login"}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginForm);
