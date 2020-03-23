import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

import { StoreState } from "../redux/configure-store";
import { Loading } from "../common/components/loading";
import { submitChangePasswordForm } from "./authentication-actions";
import { passwordRequirements } from "./common";
import { isValidPassword } from "../common/utils";

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

class ChangePasswordPage extends React.Component<any> {
  state = {
    data: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    errors: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!data.currentPassword) {
      errors.currentPassword = "Your password cannot be empty";
    }

    if (!isValidPassword(data.newPassword)) {
      errors.newPassword = "Password is too weak";
    }

    if (data.newPassword !== data.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }

    this.setState({ errors });
    if (
      errors.currentPassword ||
      errors.newPassword ||
      errors.confirmNewPassword
    ) {
      return;
    }

    this.props.submitChangePasswordForm(
      this.props.user.id,
      data.currentPassword,
      data.newPassword
    );
  };

  render() {
    const { classes, isSubmittingChangePasswordForm, t } = this.props;
    const { data, errors } = this.state;

    return (
      <main className={classes.main}>
        <Paper elevation={2} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl
              margin="normal"
              fullWidth
              error={!!errors.currentPassword}
            >
              <InputLabel htmlFor="currentPassword" required>
                Current Password
              </InputLabel>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoFocus
                value={data.currentPassword}
                onChange={this.onChange}
              />
              {errors.currentPassword && (
                <FormHelperText>{errors.currentPassword}</FormHelperText>
              )}
            </FormControl>
            <FormControl margin="normal" fullWidth error={!!errors.newPassword}>
              <InputLabel htmlFor="password" required>
                New Password
              </InputLabel>
              <Input
                name="newPassword"
                type="password"
                id="newPassword"
                value={data.newPassword}
                onChange={this.onChange}
              />
              <FormHelperText style={{ paddingTop: "10px", fontSize: 13 }}>
                {passwordRequirements}
              </FormHelperText>
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
              error={!!errors.confirmNewPassword}
            >
              <InputLabel htmlFor="password" required>
                Confirm New Password
              </InputLabel>
              <Input
                name="confirmNewPassword"
                type="password"
                id="confirmNewPassword"
                value={data.confirmNewPassword}
                onChange={this.onChange}
              />
              {errors.confirmNewPassword && (
                <FormHelperText>{errors.confirmNewPassword}</FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSubmittingChangePasswordForm ? <Loading /> : "Submit"}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = (storeState: StoreState) => ({
  isSubmittingChangePasswordForm:
    storeState.authentication.isSubmittingChangePasswordForm,
  user: storeState.authentication.user,
});

export default connect(mapStateToProps, { submitChangePasswordForm })(
  withStyles(styles)(ChangePasswordPage)
);
