import React from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { isEmail } from "validator";

import { StoreState } from "../redux/configure-store";
import { isValidPassword } from "../common/utils";
import { passwordRequirements } from "./common";
import { submitRegisterForm } from "./authentication-actions";

const styles: any = (theme: Theme) => ({
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
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const createInitialErrorState = () => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
});

class RegisterPage extends React.Component<any> {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    errors: createInitialErrorState(),
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
    const errors = createInitialErrorState();
    this.setState({ errors });

    const emptyValueErrorMessage = "Value can't be empty";

    if (data.firstName.length === 0) {
      errors.firstName = emptyValueErrorMessage;
    }

    if (data.lastName.length === 0) {
      errors.lastName = emptyValueErrorMessage;
    }

    if (!isEmail(data.email)) errors.email = "Invalid email";

    if (!isValidPassword(data.password))
      errors.password = emptyValueErrorMessage;

    this.setState({ errors });

    const hasErrors = Object.values(errors).some(
      (error: string) => error.length !== 0
    );

    if (!hasErrors) {
      this.props.submitRegisterForm(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );
    }
  };

  render() {
    const { classes, isRegisterFailed } = this.props;
    const { data, errors } = this.state;

    return (
      <main className={classes.main}>
        <Paper elevation={2} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth error={!!errors.firstName}>
              <InputLabel htmlFor="firstName" required>
                First Name
              </InputLabel>
              <Input
                id="firstName"
                name="firstName"
                autoFocus
                autoComplete="off"
                value={data.firstName}
                onChange={this.onChange}
              />
              {errors.firstName && (
                <FormHelperText>{errors.firstName}</FormHelperText>
              )}
            </FormControl>
            <FormControl margin="normal" fullWidth error={!!errors.lastName}>
              <InputLabel htmlFor="lastName" required>
                Last Name
              </InputLabel>
              <Input
                id="lastName"
                name="lastName"
                autoFocus
                autoComplete="off"
                value={data.lastName}
                onChange={this.onChange}
              />
              {errors.lastName && (
                <FormHelperText>{errors.lastName}</FormHelperText>
              )}
            </FormControl>
            <FormControl margin="normal" fullWidth error={!!errors.email}>
              <InputLabel htmlFor="email" required>
                Email Address
              </InputLabel>
              <Input
                id="email"
                name="email"
                value={data.email}
                autoComplete="off"
                onChange={this.onChange}
              />
              {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
            </FormControl>
            <FormControl margin="normal" fullWidth error={!!errors.password}>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="off"
                value={data.password}
                onChange={this.onChange}
              />
              <FormHelperText style={{ paddingTop: "10px", fontSize: 13 }}>
                {passwordRequirements}
              </FormHelperText>
            </FormControl>
            <FormHelperText
              error={true}
              className={isRegisterFailed ? "" : "hidden"}
            >
              User already registered, or generic error.
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => ({
  isRegisterFailed: storeState.authentication.registerFailed,
});

export default connect(mapStateToProps, { submitRegisterForm })(
  withStyles(styles)(RegisterPage)
);
